import React from 'react'

import ReactTable from 'react-table'
import Linkify from 'react-linkify'
import PropTypes from 'prop-types'
import ReactDOMServer from 'react-dom/server'
import { configureUrlQuery, addUrlProps, UrlQueryParamTypes } from 'react-url-query'
import { connect } from 'react-redux'

import history from '../../src/history'

import '!style-loader!css-loader!react-table/react-table.css'

import s from './RuleTable.css'

const urlPropsQueryConfig = {
  data: {type: UrlQueryParamTypes.string}
};

configureUrlQuery({history})

const mapStateToProps = state => {
  return {
    editing: state.editing
  }
}

class RuleTable extends React.PureComponent {
  static defaultState = {
    data: [
      {name: '', location: ''},
      {name: '', location: ''}
    ]
  }

  constructor (props, context) {
    super(props, context)
    this.renderEditable = this.renderEditable.bind(this)
    this.renderRemove = this.renderRemove.bind(this)

    this.state = {}
    Object.assign(this.state, props)
    this.state.data = props.data ? JSON.parse(props.data) : RuleTable.defaultState.data
    
    this.state.columns = [
      {
        Header: 'Ruleset Name',
        accessor: 'name',
        Cell: this.renderEditable('PHB')
      },
      {
        Header: 'Location',
        accessor: 'location',
        Cell: this.renderEditable('Local Bookstore')
      },
      {
        Header: 'Remove',
        id: 'remove',
        accessor: () => 'x',
        show: this.props.editing,
        Cell: this.renderRemove,
        width: 100
      }
    ]
  }

  componentWillReceiveProps (nextProps) {
    if (!nextProps.editing && this.props.editing) {
      this.state.onChangeData(JSON.stringify(this.state.data))
    }
    
    const columns = [...this.state.columns]

    columns[2].show = nextProps.editing

    this.setState({columns})
  }

  renderRemove (cellInfo) {
    return (<span onClick={() => {
      const data = [...this.state.data]

      if (data[cellInfo.index].name !== '' || data[cellInfo.index].location !== '' && data.length > 1) {
        data.splice(cellInfo.index, 1)
      }
      
      this.setState({data})
    }}>x</span>)
  }

  renderEditable (defaultValue = '') {
    return (cellInfo) => this.props.editing ? (<div><div style={{ backgroundColor: '#fafafa' }} data-ph={defaultValue} className={s.editableCell} contentEditable suppressContentEditableWarning onBlur={(e) => {
      const data = [...this.state.data]
      data[cellInfo.index][cellInfo.column.id] = e.target.textContent
      const rows = () => {
        const last = data[data.length-2]
        const secondLast = data[data.length-3]
        if (last.name !== '' || last.location !== '') {
          data.push({name: '', location: ''})
        } else if (typeof secondLast !== 'undefined' && secondLast.name == '' && secondLast.location == '') {
          data.pop()
          rows()
        }
      }
      rows()
      this.setState({data: data})
    }}>{this.state.data[cellInfo.index][cellInfo.column.id]}</div></div>) : (<div><Linkify>{this.state.data[cellInfo.index][cellInfo.column.id]}</Linkify></div>) 
  }

  render () {
    return (
      <div className='table-wrap' style={{marginBottom: '20px'}}>
        <br />
        <ReactTable
          data={this.state.data}
          columns={this.state.columns}
          pageSize={this.state.data.length}
          showPageSizeOptions={false}
          showPagination={false}
          key={this.props.editing}
        />
      </div>
    )
  }
}

export default addUrlProps({urlPropsQueryConfig})(connect(mapStateToProps)(RuleTable))
