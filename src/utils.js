import axios from 'axios'
import cheerio from 'cheerio'

export function scrapeSite(url) {
    const promise = axios.get(`http://allorigins.me/get?url=${url}`)
        .then(response => {
            const $ = cheerio.load(response.data.contents)
            const $flightTableRows = $('.flights__table .stylish-table__row--body')

            const listOfFlights = []
            let counter = 0

            $flightTableRows.each(function () {
                const $time = $(this).find('.flights__table__col--time')
                const time = $time.text().trim()

                const $expectedTime = $time.next()
                const expectedTime = $expectedTime.text().trim()

                const company = $expectedTime.next().text().trim()
                const destination = $(this).find('.flights__table__col--destination span').first().text().trim()
                const gate = $(this).find('.flights__table__col--gate').text().trim()

                const $terminal = $(this).find('.flights__table__col--terminal')
                const terminal = $terminal.text().trim()
                const status = $terminal.next().text().trim()

                listOfFlights.push({ id: counter, time, expectedTime, company, destination, gate, terminal, status })
                counter++
            })

            return listOfFlights
        })

    return promise
}