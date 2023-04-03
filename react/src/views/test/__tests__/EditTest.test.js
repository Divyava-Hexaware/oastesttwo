const {
    render,
    screen,
    fireEvent,
    within,
    getByRole,
    act,
    cleanup,
} = require('@testing-library/react')
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import store from 'store/store'
import {
    BrowserRouter as Router,
    Navigate,
    Route,
    Routes,
} from 'react-router-dom'
import { SettingsProvider } from 'common/contexts/SettingsContext'
import { MatxTheme } from 'components'
import EditTest from '../EditTest'
import { testAdded } from '../store/testSlice'
beforeAll(() => {
    store.dispatch(
        testAdded({
            id: 1,
            uname: 'uname',
            pwd: 'pwd',
            confirm: true,
        })
    )
})

beforeEach(() => {
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <Routes>
                            <Route
                                path="/"
                                element={<Navigate to="test/edit/1" replace />}
                            />
                            <Route
                                path="test/edit/:id"
                                element={<EditTest />}
                            />
                        </Routes>
                    </Router>
                </MatxTheme>
            </SettingsProvider>
        </Provider>
    )
})

const clickAndWait = async (element) => {
    await act(async () => {
        fireEvent.click(element)
    })

    await act(async () => {
        jest.runOnlyPendingTimers()
    })
}

afterEach(cleanup)

describe('testing view of TestEdit Component', () => {
    test('should render EditTest and display the heading Edit Form', async () => {
        const headingNote = screen.getByText(/Edit Form/i)
        expect(headingNote).toBeInTheDocument()
    })

    test('should have all input fields present in the edit form', async () => {
        const saveTestButtonElement = screen.getByRole('button', {
            name: /save/i,
        })
        const unameElement = screen.getByLabelText(/Uname/i)
        const pwdElement = screen.getByLabelText(/Pwd/i)
        const confirmElement = screen.getByLabelText(/Confirm/i)

        expect(saveTestButtonElement).toBeInTheDocument()

        expect(unameElement).toBeInTheDocument()
        expect(pwdElement).toBeInTheDocument()
        expect(confirmElement).toBeInTheDocument()
    })

    test('should be able to give inputs to all fields of Test edit form', async () => {
        const unameElement = screen.getByLabelText(/Uname/i)
        const pwdElement = screen.getByLabelText(/Pwd/i)
        const confirmElement = screen.getByLabelText(/Confirm/i)

        fireEvent.change(unameElement, { target: { value: 'uname' } })
        fireEvent.change(pwdElement, { target: { value: 'pwd' } })

        expect(unameElement.value).toBe('uname')

        expect(pwdElement.value).toBe('pwd')

        fireEvent.mouseDown(confirmElement)
        const confirmlistbox = within(screen.getByRole('listbox'))
        fireEvent.click(confirmlistbox.getByText(/True/))
        expect(confirmElement).toHaveTextContent(/True/i)
    })

    test('should return error message when save button is clicked on invalid form', async () => {
        jest.useFakeTimers()
        const unameElement = screen.getByLabelText(/Uname/i)
        const pwdElement = screen.getByLabelText(/Pwd/i)

        fireEvent.change(unameElement, { target: { value: '' } })
        fireEvent.change(pwdElement, { target: { value: '' } })
        await act(async () => {
            jest.runOnlyPendingTimers()
        })
        const saveTestButtonElement = screen.getByRole('button', {
            name: /save/i,
        })

        await clickAndWait(saveTestButtonElement)

        const errorList = await screen.findAllByText('this field is required')
        expect(errorList).toHaveLength(2)
    })
})
