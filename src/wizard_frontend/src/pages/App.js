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
          timeout={250}
          classNames='fade'
          key={location.key}
          >
            <Routes location={location}>
              <Route path="/" element={<Landing/>} />
              <Route path="game" element={<Game />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </CSSTransition>
        </TransitionGroup>
    )
  }