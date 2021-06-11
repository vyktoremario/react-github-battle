import React, { Component, Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Nav from "./Components/Nav/Nav";
import { ThemeProvider } from "./Contexts/theme";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Loading from './Components/Loading/Loading'

const  Results = React.lazy(() => import ("./Components/Result/Result"));
const Popular = React.lazy(() => import("./Components/Popular/popular"));
const Battle  = React.lazy(() => import("./Components/Battle/Battle"));
class App extends Component {
  state = {
    theme: "dark",
    toggleTheme: () => {
      this.setState(({ theme }) => ({
        theme: theme === "dark" ? "light" : "dark",
      }));
    },
  };
  render() {
    return (
      <Router>
        <ThemeProvider value={this.state}>
          <div className={this.state.theme}>
            <div className="container">
              <Nav />

              <Suspense fallback={<Loading />} >
              <Switch>
                <Route exact path="/" component={Popular} />
                <Route exact path="/battle" component={Battle} />
                <Route path="/battle/results" component={Results} />
                <Route render={() => <h1>404</h1>} />
              </Switch>
              </Suspense>
            </div>
          </div>
        </ThemeProvider>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
