const withSetStateAsync = () => {
    return (Component) => {
        return class extends Component {
            setStateAsync(state, callback = () => {}) {
                return new Promise((resolve) => {
                    this.setState({...state}, () => {
                        callback()
                        resolve()
                    })
                })
            }
        }
    }
}

export default withSetStateAsync