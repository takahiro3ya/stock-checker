import React from 'react'
import Container from '@material-ui/core/Container'

import PreferenceMail from './PreferenceMail'
import PreferenceCategories from './PreferenceCategories'

const Preferences = () => {
  return (
    <Container maxWidth="sm" style={{ padding: 3 }}>
      <PreferenceMail />
      <PreferenceCategories />
    </Container>
  )
}

export default Preferences

