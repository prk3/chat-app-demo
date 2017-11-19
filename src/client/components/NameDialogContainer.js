
import React from 'react'
import { connect } from 'react-redux'

import NameDialog from './NameDialog.js'
import * as actions from '../state/actions.js'


const mapStateToProps = (state, ownProps) => ({
  connectionError: state.connectionError,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  connectToServer: username => dispatch(actions.connectToServer(username)),
})

const NameDialogContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(NameDialog)

export default NameDialogContainer


