import React from 'react';
import AppLayout from './Components/AppLayout';
import Routes from './Routes';
class App extends React.Component {
  render() {
    return (
      <AppLayout
        items={
          this.props.isAuthenticated
            ? ['Home', 'Posts', 'Account']
            : ['Home', 'Sign In', 'Sign Up']
        }
        mode="horizontal"
        style={{ lineHeight: '64px', backgroundColor: 'rgba(255,255,255,0.9)' }}
        theme='light'
      >
        <Routes {...this.props} />
      </AppLayout>
    );
  };
};
export default App;


