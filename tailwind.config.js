/** @type {import('tailwindcss').Config} */
export default {
  separator: '_', // if you recall the : operator for div(class="blah-blah:blah"), you can do something like:
  //                                                  div.blah-blah_blah()                        
  // these two statements are equivalent
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

