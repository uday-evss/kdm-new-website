import React, { createContext, useContext } from 'react';

// First-load reveal. The site no longer holds visitors behind a loading
// overlay: the page is usable immediately, and the "construction" happens in
// the content itself (the hero's drafting lines draw in, headlines rise,
// images are uncovered). The context is kept so first-screen components can
// still coordinate their entrance in one place if a short prelude is ever
// reintroduced.

const IntroContext = createContext(true);

export const useIntroDone = () => useContext(IntroContext);

export function IntroProvider({ children }) {
    return <IntroContext.Provider value>{children}</IntroContext.Provider>;
}
