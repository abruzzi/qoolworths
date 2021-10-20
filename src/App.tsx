import {CSSProperties} from "react";

const containerStyles = {textAlign: "center"} as CSSProperties

const headerStyles = {
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '24px',
} as CSSProperties

const App = () => {
  return (<div style={containerStyles}>
    <header style={headerStyles}>
      <p>Edit src/App.tsx and save to reload.</p>
      <a href="https://reactjs.org" target="_blank" rel="noreferrer">Learn React</a>
    </header>
  </div>)
}

export default App