import "./index.css";

export const Header = ({showProfile = false}: { showProfile?: boolean }) => {
  return (
    <header data-testid='header'>
      <nav className="navigation">
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>Logo</li>
          {showProfile && (<li>
            <a href="/profile">Profile</a>
          </li>)}
        </ul>
      </nav>
    </header>
  );
};

const Footer = () => {
  return <footer data-testid='footer'>@Copyright 2022</footer>
}

export const EmptyHeader = () => null
export const EmptyFooter = () => null

type StackViewProps = {
  header?: React.ReactNode,
  footer?: React.ReactNode,
  children: React.ReactNode
}

const StackView = ({children, header, footer}: StackViewProps) => {
  return (
    <div className="stack">
      {header ? header : <Header />}
      <main data-testid='content'>{children}</main>
      {footer ? footer :<Footer/>}
    </div>
  );
};

export default StackView