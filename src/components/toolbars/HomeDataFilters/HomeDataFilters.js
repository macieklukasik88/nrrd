import React, { useContext, useEffect } from 'react'

import { DataFilterContext } from '../../../stores/data-filter-store'
import { DATA_FILTER_CONSTANTS as DFC } from '../../../constants'

import { makeStyles } from '@material-ui/core/styles'

import {
  BreakoutBySelectInput,
  CommoditySelectInput,
  PeriodSelectInput,
  YearlyMonthlyToggleInput
} from '../../inputs'

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(0),
    minWidth: 120,
    textAlign: 'right',
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  periodToggleButton: {
    '&:hover': {
      backgroundColor: `${ theme.palette.links.default } !important`,
      color: theme.palette.common.white,
    },
  },
  sectionControlContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
  sectionControlsContainer: {
    '& > div:first-child': {
      marginTop: 4,
      marginBottom: 20,
    },
    '& > div:nth-child(2)': {
      marginTop: -6,
    },
    '& > div:nth-child(3)': {
      marginTop: -6,
    }
  }
}))

const HomeDataFilters = props => {
  const classes = useStyles()

  const { state: filterState, updateDataFilter } = useContext(DataFilterContext)
  const { monthly, dataType, year, commodity } = filterState

  const {
    maxFiscalYear,
    maxCalendarYear
  } = props

  const calendarYear = (dataType === DFC.PRODUCTION) ? maxCalendarYear - 1 : maxCalendarYear

  const MENU_OPTIONS = {
    [DFC.MONTHLY]: [
      { value: DFC.YEARLY, option: DFC.YEARLY },
      { value: DFC.PERIOD_MONTHLY, option: DFC.PERIOD_MONTHLY }
    ],
    [DFC.PERIOD]: [
      { value: DFC.PERIOD_FISCAL_YEAR, option: DFC.PERIOD_FISCAL_YEAR },
      { value: DFC.PERIOD_CALENDAR_YEAR, option: DFC.PERIOD_CALENDAR_YEAR }
    ],
    monthlyPeriod: [
      { value: 'Most recent 12 months', option: 'Most recent 12 months' },
      { value: DFC.PERIOD_FISCAL_YEAR, option: `Fiscal year ${ monthly === DFC.MONTHLY ? maxFiscalYear : year }` },
      { value: DFC.PERIOD_CALENDAR_YEAR, option: `Calendar year ${ calendarYear }` }
    ],
    [DFC.BREAKOUT_BY]: {
      [DFC.REVENUE]: [
        { value: DFC.SOURCE, option: 'Source' },
        { value: 'revenue_type', option: 'Revenue Type' },
        { value: 'commodity', option: 'Commodity' }
      ],
      [DFC.DISBURSEMENT]: [
        { value: DFC.SOURCE, option: 'Source' },
        { value: DFC.RECIPIENT, option: 'Recipient' },
      ]
    },
    [DFC.COMMODITY]: [
      { value: 'Oil (bbl)', option: 'Oil (bbl)' },
      { value: 'Gas (mcf)', option: 'Gas (mcf)' },
      { value: 'Coal (tons)', option: 'Coal (tons)' }
    ]
  }

  useEffect(() => {
    if (monthly === DFC.MONTHLY_CAPITALIZED) {
      updateDataFilter({ ...filterState, [DFC.PERIOD]: 'Most recent 12 months' })
    }
    else {
      updateDataFilter({ ...filterState, [DFC.PERIOD]: DFC.PERIOD_FISCAL_YEAR })
    }
  }, [monthly])

  return (
    <div className={classes.sectionControlsContainer}>
      <YearlyMonthlyToggleInput
        dataFilterKey={DFC.MONTHLY}
        defaultSelected={monthly || DFC.YEARLY}
        data={MENU_OPTIONS[DFC.MONTHLY]}
        label=""
        legend=""
        size="medium" />

      <PeriodSelectInput
        dataFilterKey={DFC.PERIOD}
        data={(monthly === DFC.YEARLY) ? MENU_OPTIONS[DFC.PERIOD] : MENU_OPTIONS.monthlyPeriod}
        defaultSelected={(monthly === DFC.YEARLY) ? MENU_OPTIONS[DFC.PERIOD][0].value : MENU_OPTIONS.monthlyPeriod[0].value}
        selected={(monthly === DFC.YEARLY) ? MENU_OPTIONS[DFC.PERIOD][0].value : MENU_OPTIONS.monthlyPeriod[0].value}
        label="Period"
        selectType="Single"
        showClearSelected={false}
        disabled={dataType === DFC.DISBURSEMENT && monthly === DFC.YEARLY}
      />

      {dataType !== DFC.PRODUCTION &&
        <BreakoutBySelectInput
          dataFilterKey={DFC.BREAKOUT_BY}
          data={(dataType === DFC.REVENUE) ? MENU_OPTIONS[DFC.BREAKOUT_BY][DFC.REVENUE] : MENU_OPTIONS[DFC.BREAKOUT_BY][DFC.DISBURSEMENT]}
          defaultSelected={(dataType === DFC.REVENUE) ? MENU_OPTIONS[DFC.BREAKOUT_BY][DFC.REVENUE][0].value : MENU_OPTIONS[DFC.BREAKOUT_BY][DFC.DISBURSEMENT][0].value}
          selected={(dataType === DFC.REVENUE) ? MENU_OPTIONS[DFC.BREAKOUT_BY][DFC.REVENUE][0].value : MENU_OPTIONS[DFC.BREAKOUT_BY][DFC.DISBURSEMENT][0].value}
          label="Breakout"
          selectType="Single"
          showClearSelected={false} />
      }
      {dataType === DFC.PRODUCTION &&
        <CommoditySelectInput
          dataFilterKey={DFC.COMMODITY}
          data={MENU_OPTIONS[DFC.COMMODITY]}
          selected={commodity || MENU_OPTIONS[DFC.COMMODITY][0].option}
          label="Commodity"
          selectType="Single"
          showClearSelected={false} />
      }
    </div>

  )
}

export default HomeDataFilters