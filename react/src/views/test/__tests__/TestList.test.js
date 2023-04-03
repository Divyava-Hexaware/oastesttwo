const { render, screen, cleanup } = require('@testing-library/react')
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import store from 'store/store'
import { BrowserRouter as Router } from 'react-router-dom'
import { SettingsProvider } from 'common/contexts/SettingsContext'
import { MatxTheme } from 'components'
import TestList from '../TestList'
import axios from '../../../axios'
import MockAdapter from 'axios-mock-adapter'

afterEach(cleanup)

test('should render Test rows when api response has data', async () => {
    const endPoint = 'test'
    const getTestListResponse = [
        {
            id: 1,
            uname: 'uname',
            pwd: 'pwd',
            confirm: false,
        },
    ]
    const mock = new MockAdapter(axios)
    mock.onGet(`/${endPoint}`).reply(200, getTestListResponse)
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <TestList />
                    </Router>
                </MatxTheme>
            </SettingsProvider>
        </Provider>
    )
    const testUnameCell = await screen.findByText(/uname/i)

    expect(testUnameCell).toHaveTextContent(/uname/i)
    mock.reset()
})
