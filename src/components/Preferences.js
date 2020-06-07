import React from 'react'
import Container from '@material-ui/core/Container'

import PreferenceMail from './PreferenceMail'
import PreferenceCategories from './PreferenceCategories'
import PreferenceData from './PreferenceData'

const Preferences = () => {
  return (
    <Container maxWidth="sm" style={{ padding: 3 }}>
      <PreferenceMail />
      <PreferenceCategories />
      <PreferenceData />
    </Container>
  )
}

export default Preferences

