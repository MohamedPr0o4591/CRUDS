export const getDesignTokens = (mode) => ({
    palette: {
        mode,
        ...(mode === 'dark'
            ? {
                // palette values for light mode
                bg: {
                    primary: '#211e31',
                    secondary: '#14092e',
                }
            }
            : {
                // palette values for dark mode
                bg: {
                    primary: '#efef',
                    secondary: 'rgb(203 209 203)',
                }
            }),
    },
});
