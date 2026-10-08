import { useEffect, useState } from 'react';

// Live result of a CSS media query (false during the first server-less render
// if matchMedia is unavailable).
export function useMediaQuery(query) {
    const get = () => (typeof window !== 'undefined' && window.matchMedia ? window.matchMedia(query).matches : false);
    const [matches, setMatches] = useState(get);

    useEffect(() => {
        const list = window.matchMedia(query);
        const onChange = () => setMatches(list.matches);
        onChange();
        list.addEventListener('change', onChange);
        return () => list.removeEventListener('change', onChange);
    }, [query]);

    return matches;
}

// Desktop-class pointer: hover-capable, precise. Cursor effects only run here.
export const useFinePointer = () => useMediaQuery('(hover: hover) and (pointer: fine)');

export const useDesktop = () => useMediaQuery('(min-width: 1024px)');
