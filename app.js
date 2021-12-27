const express = require('express')
const { engine } = require('express-handlebars');
const connectDB = require('./config/db')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const PORT = 5000

// Import routers
const posts = require('./routes/posts')

// Khoi dong app
const app = express()

// Khoi dong handlebars middleware
app.engine('handlebars', engine({ extname: '.handlebars', defaultLayout: "main"}));
app.set('view engine', 'handlebars');

// Khoi dong bodyParser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Khoi dong methodOverride middleware
app.use(methodOverride('_method'))

// Khoi dong express middleware
app.use(express.json())

// Ket noi co so du lieu
connectDB()

// Mot so routes co ban, co the dua vao file rieng trong folder "routes"
app.get('/', (req, res) => res.render('index'))
app.get('/about', (req, res) => res.render('about'))

// Mang routes de su dung
app.use('/posts', posts)

app.listen(PORT, () => console.log(`Server khoi dong tai Port ${PORT}`))