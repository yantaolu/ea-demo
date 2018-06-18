<script>
const array = () => {
  return {
    type: Array,
    default: () => []
  }
}

const boolean = (val = true) => {
  return {
    type: Boolean,
    default: val
  }
}

export default {
  name: 'tf-table',
  render(h) {
    const _self = this
    let columns = []

    const createColumn = (column, key) => {
      let option = {
        props: {
          type: column.type,
          index: column.index,
          columnKey: column.columnKey,
          label: column.label,
          prop: column.prop,
          width: column.width,
          minWidth: column.minWidth,
          fixed: column.fixed,
          renderHeader: column.renderHeader,
          sortable: column.sortable,
          sortMethod: column.sortMethod,
          sortBy: column.sortBy,
          sortOrders: column.sortOrders,
          resizable: column.resizable,
          formatter: column.formatter,
          showOverflowTooltip: column.showOverflowTooltip,
          align: column.align,
          headerAlign: column.headerAlign,
          className: column.className,
          labelClassName: column.labelClassName,
          selectable: column.selectable,
          reserveSelection: column.reserveSelection,
          filters: column.filters,
          filterPlacement: column.filterPlacement,
          filterMultiple: column.filterMultiple,
          filterMethod: column.filterMethod,
          filteredValue: column.filteredValue
        },
        key
      }

      if (column.columns) {
        let children = []
        column.columns.forEach((child, index) => {
          if (child.hidden) {
            return true
          }
          children.push(createColumn(child, `${key}-${index}`))
        })
        return h('el-table-column', option, children)
      } else {
        // 分页列表定制index为累加
        if (column.type === 'index' && _self.pagination) {
          Object.assign(option, {
            scopedSlots: {
              default: props => {
                return (_self.currentPage - 1) * _self.currentPageSize + props.$index + 1
              }
            }
          })
        } else if (!column.type && column.renderCell) {
          Object.assign(option, {
            scopedSlots: {
              default: props => column.renderCell(h, props)
            }
          })
        }
        return h('el-table-column', option)
      }
    }

    _self.columns.forEach((column, index) => {
      if (column.hidden) {
        return true
      }
      columns.push(createColumn(column, `tf-table-column-${index}`))
    })

    let table = h('el-table', {
      ref: 'elTable',
      class: {
        'el-table--fluid-height': _self.flex,
        'el-table--scrollable-y': _self.flex
      },
      props: {
        data: _self.tableData,
        height: _self.tableHeight,
        maxHeight: _self.maxHeight,
        stripe: _self.stripe,
        border: _self.border,
        size: _self.size,
        fit: _self.fit,
        showHeader: _self.showHeader,
        highlightCurrentRow: _self.highlightCurrentRow,
        currentRowKey: _self.currentRowKey,
        rowClassName: _self.rowClassName,
        rowStyle: _self.rowStyle,
        cellClassName: _self.cellClassName,
        cellStyle: _self.cellStyle,
        headerRowClassName: _self.headerRowClassName,
        headerRowStyle: _self.headerRowStyle,
        headerCellClassName: _self.headerCellClassName,
        headerCellStyle: _self.headerCellStyle,
        rowKey: _self.rowKey,
        emptyText: _self.emptyText,
        defaultExpandAll: _self.defaultExpandAll,
        expandRowKeys: _self.expandRowKeys,
        defaultSort: _self.defaultSort,
        tooltipEffect: _self.tooltipEffect,
        showSummary: _self.showSummary,
        sumText: _self.sumText,
        summaryMethod: _self.summaryMethod,
        spanMethod: _self.spanMethod,
        selectOnIndeterminate: _self.selectOnIndeterminate
      },
      on: {
        select: (selection, row) => {
          _self.$emit('select', selection, row)
        },
        'select-all': (selection) => {
          _self.$emit('select-all', selection)
        },
        'selection-change': (selection) => {
          _self.selection = selection
          _self.$emit('selection-change', selection)
        },
        'cell-mouse-enter': (row, column, cell, event) => {
          _self.$emit('cell-mouse-enter', row, column, cell, event)
        },
        'cell-mouse-leave': (row, column, cell, event) => {
          _self.$emit('cell-mouse-leave', row, column, cell, event)
        },
        'cell-click': (row, column, cell, event) => {
          _self.$emit('cell-click', row, column, cell, event)
        },
        'cell-dblclick': (row, column, cell, event) => {
          _self.$emit('cell-dblclick', row, column, cell, event)
        },
        'row-click': (row, event, column) => {
          _self.$emit('row-click', row, event, column)
        },
        'row-contextmenu': (row, event) => {
          _self.$emit('row-contextmenu', row, event)
        },
        'row-dblclick': (row, event) => {
          _self.$emit('row-dblclick', row, event)
        },
        'header-click': (column, event) => {
          _self.$emit('header-click', column, event)
        },
        'header-contextmenu': (column, event) => {
          let react = _self._table().$el.querySelector('div.el-table__header-wrapper').getBoundingClientRect()
          _self.showContextMenu = true
          clearTimeout(_self._setTimeoutId)
          _self.contextMenuStyle.top = (event.clientY - react.top) + 'px'
          _self.contextMenuStyle.left = (event.clientX - react.left) + 'px'
          _self.contextMenuStyle.opacity = 1
          event.preventDefault()
        },
        'sort-change': ({column, prop, order}) => {
          _self.$emit('sort-change', {column, prop, order})
        },
        'filter-change': (filters) => {
          _self.$emit('filter-change', filters)
        },
        'current-change': (currentRow, oldCurrentRow) => {
          _self.currentRow = currentRow
          _self.oldCurrentRow = oldCurrentRow
          _self.$emit('current-change', currentRow, oldCurrentRow)
        },
        'header-dragend': (newWidth, oldWidth, column, event) => {
          _self.$emit('header-dragend', newWidth, oldWidth, column, event)
        },
        'expand-change': (row, expandedRows) => {
          _self.$emit('expand-change', row, expandedRows)
        }
      },
      scopedSlots: {
        default: props => columns
      }
    })

    const generateContextMenu = () => {
      let lis = []
      const generateLis = (columns) => {
        columns.forEach(column => {
          if (!column.columns) {
            !column.type && lis.push(column)
          } else {
            generateLis(column.columns)
          }
        })
      }
      generateLis(_self.columns)
      return (
        <div class="tf-table-header-context-menu" v-show={_self.showContextMenu} style={_self.contextMenuStyle}>
          <ul>
            {
              lis.map(li => (
                <li>
                  <el-checkbox name={li.prop} checked={li.hidden !== true} on-change={(value) => {
                    _self.toggleColumnShow(li.prop, value)
                  }}>{li.label}</el-checkbox>
                </li>
              ))
            }
          </ul>
        </div>
      )
    }

    return h('div', {
      'class': _self.flex ? 'tf-table tf-table-flex' : 'tf-table',
      on: {
        '!click': () => {
          _self.contextMenuStyle.opacity = 0
          _self._setTimeoutId = setTimeout(() => {
            _self.showContextMenu = false
          }, 500)
        }
      }
    }, [
      generateContextMenu(),
      _self.$scopedSlots.default ? _self.$scopedSlots.default({
        selection: _self.selection,
        currentRow: _self.currentRow,
        oldCurrentRow: _self.oldCurrentRow
      }) : _self.$slots.default,
      table,
      _self.pagination ? <div class="tf-pagination">
        <el-pagination ref="elPagination"
                       background
                       on-size-change={_self.handleSizeChange}
                       on-current-change={_self.handlePageChange}
                       current-page={_self.currentPage}
                       page-sizes={_self.pageSizes}
                       page-size={_self.pageSize}
                       pager-count={5}
                       layout="total, prev, pager, next, jumper, sizes"
                       total={_self.tableTotal}>
        </el-pagination>
      </div> : '',
      <transition name="el-fade-in-linear">
        <div class="tf-table-loading" v-show={_self.showLoading && _self.loading}>
          <i class="el-icon-loading"></i>
        </div>
      </transition>
    ])
  },
  props: {
    columns: array(),
    data: {
      type: Array | Function,
      default: () => []
    },
    autoLoad: boolean(),
    flex: boolean(false),
    height: String | Number,
    maxHeight: String | Number,
    stripe: boolean(false),
    border: boolean(false),
    size: String,
    fit: boolean(),
    showHeader: boolean(),
    highlightCurrentRow: boolean(),
    currentRowKey: String | Number,
    rowClassName: Function | String,
    rowStyle: Function | Object,
    cellClassName: Function | String,
    cellStyle: Function | Object,
    headerRowClassName: Function | String,
    headerRowStyle: Function | Object,
    headerCellClassName: Function | String,
    headerCellStyle: Function | String,
    rowKey: Function | String,
    emptyText: String,
    defaultExpandAll: boolean(false),
    expandRowKeys: Array,
    defaultSort: {
      type: Object,
      default: () => {
        order: 'ascending'
      }
    },
    tooltipEffect: String,
    showSummary: boolean(false),
    sumText: String,
    summaryMethod: Function,
    spanMethod: Function,
    selectOnIndeterminate: boolean(),
    pagination: boolean(),
    pageSizes: {
      type: Array,
      default() {
        return [10, 20, 50, 100, 200]
      }
    },
    pageSize: {
      type: Number,
      default: 20
    },
    showLoading: boolean(),
    loading: boolean(false)
  },
  data() {
    return {
      tableData: [],
      tableTotal: 0,
      currentPageSize: 0,
      currentPage: 1,
      _setTimeoutId: null,
      showContextMenu: false,
      contextMenuStyle: {
        top: 0,
        left: 0,
        opacity: 0
      },
      selection: null,
      currentRow: null,
      oldCurrentRow: null
    }
  },
  computed: {
    total() {
      return this.tableData.length
    },
    tableHeight() {
      return this.flex ? '200px' : this.height
    },
    columnIndexes() {
      let indexes = {}
      const setIndexes = (columns, pIndex) => {
        columns.forEach((column, index) => {
          if (column.type) {
            return true
          }
          if (column.columns) {
            setIndexes(column.columns, index)
          } else if (column.prop) {
            indexes[column.prop] = pIndex !== undefined ? `${pIndex}-${index}` : `${index}`
          }
        })
      }
      setIndexes(this.columns)
      return indexes
    }
  },
  watch: {
    data(val) {
      this.refreshTableData()
    }
  },
  methods: {
    _table() {
      return this.$refs.elTable
    },
    _pagination() {
      return this.$refs.elPagination
    },
    _initSelection() {
      this.selection = null
      this.currentRow = null
      this.oldCurrentRow = null
    },
    clearSelection() {
      this._table().clearSelection()
    },
    toggleRowSelection(row, selected) {
      this._table().toggleRowSelection(row, selected)
    },
    toggleRowExpansion(row, expanded) {
      this._table().toggleRowExpansion(row, expanded)
    },
    setCurrentRow(row) {
      this._table().setCurrentRow(row)
    },
    clearSort() {
      this._table().clearSort()
    },
    clearFilter() {
      this._table().clearFilter()
    },
    doLayout() {
      this._table().doLayout()
    },
    sort({prop, order = 'ascending'}) {
      this._table().sort({prop, order})
    },
    setData(data) {
      this.tableData = data
    },
    setTotal(total) {
      this.tableTotal = total
    },
    toggleColumnShow(prop, show) {
      if (!prop) {
        return false
      } else if (show) {
        this.showColumn(prop)
      } else {
        this.hideColumn(prop)
      }
    },
    getColumnIndexes(prop) {
      let index = this.columnIndexes[prop]
      return index !== undefined ? index.split('-') : null
    },
    showColumn(prop) {
      let indexes = this.getColumnIndexes(prop)
      if (!indexes) {
        return
      }
      // 递归设置显示
      let column = Object.assign({}, this.columns[indexes[0]])
      let col, len = indexes.length
      for (let i = 1; i < len; i++) {
        if (!col) {
          col = column.columns[indexes[i]]
        } else {
          col = col.columns[indexes[i]]
        }
        col && (col.hidden = false)
      }
      column.hidden = false
      // 调用splice触发更新
      this.columns.splice(indexes[0], 1, column)
    },
    hideColumn(prop) {
      let indexes = this.getColumnIndexes(prop)
      if (!indexes) {
        return
      }
      // 找到对应的列，设置隐藏
      let column = indexes && Object.assign({}, this.columns[indexes[0]])
      let col, len = indexes.length, columns = [column]
      for (let i = 1; i < len; i++) {
        if (!col) {
          col = column.columns[indexes[i]]
          columns.push(column.columns[indexes[i]])
        } else {
          col = col.columns[indexes[i]]
          columns.push(col.columns[indexes[i]])
        }
      }
      col && (col.hidden = true)
      // 递归检测父列是否需要隐藏
      let colLen = columns.length
      if (colLen > 1) {
        for (let i = colLen - 2; i >= 0; i--) {
          let hidden = true
          columns[i].columns.forEach(col => {
            if (col.hidden !== true) {
              hidden = false
            }
          })
          columns[i].hidden = hidden
        }
      }
      // 调用splice触发更新
      this.columns.splice(indexes[0], 1, column)
    },
    handleSizeChange(size) {
      this.currentPageSize = size
      this.refreshTableData()
    },
    handlePageChange(page) {
      this.currentPage = page
      this.refreshTableData()
    },
    refreshTableData() {
      this._initSelection()
      let currentPageSize = this.currentPageSize || this.pageSize
      if (this.data instanceof Array) {
        // 静态数据需要分页的情况
        if (this.pagination) {
          this.setTotal(this.data.length)
          let start = (this.currentPage - 1) * currentPageSize
          let end = Math.min(this.currentPage * currentPageSize, this.tableTotal)
          this.setData(this.data.slice(start, end))
        } else {
          this.setData(this.data)
        }
      } else if (this.data instanceof Function) {
        this.data({
          page: this.currentPage,
          size: currentPageSize,
          setData: this.setData,
          setTotal: this.setTotal
        })
      }
    }
  },
  mounted() {
    this.refreshTableData()
    if (this.flex) {
    }
  }
}
</script>

<style lang="scss">

.tf-table {
  position: relative;
  .tf-table-header-context-menu {
    background: #ffffff;
    position: absolute;
    z-index: 100;
    padding: 10px 15px;
    border-radius: 3px;
    box-shadow: 0 0 2px 1px #dfdfdf;
    max-height: 200px;
    overflow-x: hidden;
    overflow-y: auto;
    transition: opacity .3s ease-in;

    ul {
      list-style: none;
      list-style-position: inside;
      text-indent: 0;

      li {
        line-height: 24px;
      }
    }
  }

  .tf-pagination {
    text-align: right;
    margin: 10px 0;
    overflow: hidden;

    .el-pagination__sizes {
      margin-left: 40px;
    }
  }

  .tf-table-loading {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 40px;
    color: #ccc;
    background: rgba(200, 200, 200, .1);
  }
}

.tf-table-flex {
  display: flex;
  flex-direction: column;
  flex: auto;

  .el-table {
    flex: auto;
    display: flex;
    flex-direction: column;
    .el-table__body-wrapper {
      flex: auto;
    }
  }
}
</style>
