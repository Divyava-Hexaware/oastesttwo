const {
    render,
    screen,
    fireEvent,
    within,
    waitFor,
    getByRole,
    act,
    cleanup,
} = require('@testing-library/react')
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import store from 'store/store'
import { BrowserRouter as Router } from 'react-router-dom'
import { SettingsProvider } from 'common/contexts/SettingsContext'
import { MatxTheme } from 'components'
import axios from '../../../axios'
import MockAdapter from 'axios-mock-adapter'
import AddTest from '../AddTest'

beforeEach(() => {
    const endPoint = 'test'
    const getStudentListResponse = [
        {
            id: 1,
            uname: 'uname',
            pwd: 'pwd',
            confirm: true,
        },
    ]
    const mock = new MockAdapter(axios)
    mock.onGet(`/${endPoint}`).reply(200, getStudentListResponse)
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <AddTest />
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

describe('testing view TestAdd Component', () => {
    test('should render AddTest and to display Add Form title', async () => {
        const headingNote = screen.getByText(/Add Form/i)
        expect(headingNote).toBeInTheDocument()
    })

    test('should have all input fields present in the add form', async () => {
        const addTestButtonElement = screen.getByRole('button', {
            name: /Add/i,
        })

        const unameElement = screen.getByLabelText(/Uname/i)
        const pwdElement = screen.getByLabelText(/Pwd/i)
        const confirmElement = screen.getByLabelText(/Confirm/i)

        expect(addTestButtonElement).toBeInTheDocument()

        expect(unameElement).toBeInTheDocument()
        expect(pwdElement).toBeInTheDocument()
        expect(confirmElement).toBeInTheDocument()
    })

    test('should be able to give inputs to all fields of Test add form', async () => {
        const unameElement = screen.getByLabelText(/Uname/i)
        const pwdElement = screen.getByLabelText(/Pwd/i)
        const confirmElement = screen.getByLabelText(/Confirm/i)

        fireEvent.change(unameElement, { target: { value: 'uname' } })
        fireEvent.change(pwdElement, { target: { value: 'pwd' } })

        fireEvent.mouseDown(confirmElement)
        const confirmlistbox = within(screen.getByRole('listbox'))
        fireEvent.click(confirmlistbox.getByText(/False/))
        expect(confirmElement).toHaveTextContent(/False/i)
    })

    test('should return error message when add Test button is clicked on invalid form', async () => {
        jest.useFakeTimers()
        const addTestButtonElement = screen.getByRole('button', {
            name: /Add/i,
        })

        await clickAndWait(addTestButtonElement)

        let errorList = await screen.findAllByText('this field is required')
        expect(errorList).toHaveLength(3)
    })
})
