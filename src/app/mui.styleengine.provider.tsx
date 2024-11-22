import { createTheme, StyledEngineProvider, ThemeProvider } from '@mui/material'

const rootElement = document.getElementById("root");
const theme = createTheme({
    components: {
        MuiPopover: {
            defaultProps: {
                container: rootElement,
            },
        },
        MuiPopper: {
            defaultProps: {
                container: rootElement,
            },
        },
        MuiDialog: {
            defaultProps: {
                container: rootElement,
            },
        },
        MuiModal: {
            defaultProps: {
                container: rootElement,
            },
        },
    },
});

const MuiStyleEngineProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <StyledEngineProvider injectFirst >
            <ThemeProvider theme={theme} >
                {children}
            </ThemeProvider>
        </StyledEngineProvider>
    );
}

export default MuiStyleEngineProvider;