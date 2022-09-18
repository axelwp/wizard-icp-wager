import * as React from "react";
import { BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useRouteMatch,
  useParams,
  useLocation } from "react-router-dom";
import Landing from "./Landing";
import Game from "./Game";
import NotFound from "./NotFound";
import {TransitionGroup, CSSTransition} from 'react-transition-group'

export default function App () {
    const location = useLocation();
    return (
    <TransitionGroup>
          <CSSTransition
          in={true}
          appear={true}
          timeout={500}
          classNames='fade'
          key={location.key}
          unmountOnExit>
            <Routes location={location}>
              <Route exact path="/" element={<Landing/>} />
              <Route path="game" element={<Game />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </CSSTransition>
        </TransitionGroup>
    )
  }