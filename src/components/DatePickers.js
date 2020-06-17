/**
 * Material-UI / @material-ui/pickers
 * https://material-ui.com/components/pickers/#material-ui-pickers
 */
import 'date-fns'
import React from 'react'
import lightGreen from '@material-ui/core/colors/lightGreen'
import { makeStyles } from '@material-ui/core/styles'
import { createMuiTheme } from "@material-ui/core"
import { ThemeProvider } from "@material-ui/styles"
import DateFnsUtils from '@date-io/date-fns'
import jaLocale from "date-fns/locale/ja"
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'
import format from "date-fns/format"

// カレンダーの表示形式をカスタマイズ
class ExtendedUtils extends DateFnsUtils {
  getCalendarHeaderText(date) {
    return format(date, "yyyy MMM", { locale: this.locale })
  }
  getDatePickerHeaderText(date) {
    return format(date, "MMMd日", { locale: this.locale })
  }
}

// カレンダーのstyleを設定
const calendarTheme = createMuiTheme({
  overrides: {
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: lightGreen[500],
      },
    },
    MuiPickersDay: {
      // day: {
      //   color: '#b7af56',
      // },
      daySelected: {
        backgroundColor: lightGreen[500],
      },
      // dayDisabled: {
      //   color: '#b7af56',
      // },
      current: {
        color: 'red',
      },
    },
  },
})

const useStyles = makeStyles((theme) => ({
  form: {
    // form選択時の枠線の色を指定
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: lightGreen[500],
      },
    },
  },
}))

export default function DatePickers({ selectedDate, setSelectedDate }) {
  const classes = useStyles()

  const handleDateChange = (date) => {
    // setSelectedDate(date)
    if (date == null) {
      setSelectedDate(null)
    } else {
      const y = date.getFullYear()
      const m = ("00" + (date.getMonth() + 1)).slice(-2)
      const d = ("00" + date.getDate()).slice(-2)
      setSelectedDate(y + "/" + m + "/" + d)
    }
  }

  const handlePickerHlpTxt = new Date(selectedDate)
    .toString() === 'Invalid Date' ?
    '例: 2021/01/01　Hint: 例と同じ形式で入力してください。' :
    '例: 2021/01/01'

  return (
    <MuiPickersUtilsProvider utils={ExtendedUtils} locale={jaLocale}>
      <ThemeProvider theme={calendarTheme}>
        <KeyboardDatePicker
          fullWidth
          autoComplete="off"
          margin="normal"
          id="date-picker-dialog"
          label="期限"
          helperText={handlePickerHlpTxt}
          format="yyyy/MM/dd"
          value={selectedDate}
          InputLabelProps={{
            shrink: true,
            style: { color: '#595959' },
          }}
          inputVariant="outlined"
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
          okLabel="決定"
          cancelLabel="キャンセル"
          className={classes.form}
        />
      </ThemeProvider>
    </MuiPickersUtilsProvider>
  )
}

