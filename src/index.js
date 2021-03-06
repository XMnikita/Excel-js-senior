import { Excel } from '@/components/excel/Excel'
import { Header } from '@/components/header/Header'
import { Formula } from '@/components/formula/Formula'
import { Table } from '@/components/table/Table'
import { Toolbar } from '@/components/toolbar/Toolbar'
import './scss/index.scss'
import { createStore } from './core/createStore'
import { rootReducer } from './redux/rootReducer'

const store = createStore(rootReducer, {})

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store,
})

excel.render()
