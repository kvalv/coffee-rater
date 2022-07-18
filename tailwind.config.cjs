const colors = require('tailwindcss/colors')
const { omit } = require('underscore')


/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
        colors: {
            primary: colors.purple,
            secondary: colors.indigo,
            coffee: '#dobb94',
            c1: '#3D0814',
            c2: '#D56AA0',
            c3: '#8D6346',
            c4: '#DAC6B5',
            ...omit(colors, 'lightBlue', 'warmGray', 'trueGray', 'coolGray', 'blueGray'),
        },
        extend: {},
    },
    plugins: [],
}
