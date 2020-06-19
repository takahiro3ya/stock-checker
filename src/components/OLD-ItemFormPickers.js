/**
 * 開発環境では問題なく使用できたが、deploy後にrenderされない事象が発生したため、
 * 本コンポーネントは使用禁止。
 * 新しくpickerのコンポーネントを作り直して対応。
 *
 * error message
 * Error: Minified React error #152; visit
 * https://reactjs.org/docs/error-decoder.html?invariant=152&args[]=We
 * for the full message or use the non-minified dev environment for
 * full errors and additional helpful warnings.
 */

/**
 * Material-UI / @material-ui/pickers
 * https://material-ui.com/components/pickers/#material-ui-pickers
 */
import 'date-fns'
import React from 'react'
import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'
import jaLocale from "date-fns/locale/ja"
import format from "date-fns/format"
import { makeStyles } from '@material-ui/core/styles'
import { createMuiTheme } from "@material-ui/core"
import { ThemeProvider } from "@material-ui/styles"
import lightGreen from '@material-ui/core/colors/lightGreen'

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

const ItemFormPickers = ({ selectedDate, setSelectedDate }) => {
  // const [selectedDate, setSelectedDate] = useState(null) // 親からpropsとして受け取る。
  const classes = useStyles()

  const handleDateChange = (pickDate) => {
    if (pickDate == null) {
      setSelectedDate(null)
    } else {
      const y = pickDate.getFullYear()
      const m = ("00" + (pickDate.getMonth()+1)).slice(-2);
      const d = ("00" + pickDate.getDate()).slice(-2);
      setSelectedDate(y + "/" + m + "/" + d)
    }
  }


  const handlePickerHlpTxt = new Date(selectedDate)
    .toString() === 'Invalid Date' ?
    '例: 2021/01/01　Hint: 例と同じ形式で入力してください。' :
    '例: 2021/01/01'

  return (
    // 日本語のlocaleおよびカスタマイズしたutilsを設定
    <MuiPickersUtilsProvider utils={ExtendedUtils} locale={jaLocale}>
      <ThemeProvider theme={calendarTheme}>
        <KeyboardDatePicker
          // placeholder="例) 2021/01/01"
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

export default ItemFormPickers
