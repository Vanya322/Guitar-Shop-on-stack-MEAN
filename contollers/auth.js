const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User'); // Подключаем модель (таблицу) юзеров
const keys = require('../config/keys')
const errorHandler = require('../utils/error-handler')

/*

   ОБРАЩАЙ ВНИМАНИЕ НА async await
   МНОГО АССИНХРОННЫХ ОПЕРАЦИЙ

   Запрос к бэку будет +- такой:
   const params = {
       header: Token, // не обязательно, но обычно юзают имеено токен вместо id юзера в БД
       body: {
           email: 'mariya.platova@gmail.ru',
       },
   }
   API.get('http://localhost:8080/api/auth/login', params)

*/

module.exports.login = async (req, res) => {

    const candidate = await User.findOne({ // Ищем юзера с пришедшим к нам имейлом в БД
        email: req.body.email, // Достаём из req.body данные, которые нам отправил фронт
    });

    const passwordCheck = bcrypt.compareSync(req.body.password, candidate.password); // Шифруем пароль

    if(candidate && passwordCheck) {
        // user exists
        // generate token


        //Я хз какие ещё есть вариации создания токена, но в видосе была такая
        const token = jwt.sign(
            { // Генерим токен на основе имейла и id юзера
                email: candidate.email,
                userId: candidate._id,
            },
            keys.jwt, //+ втыкаем туда наш  jwt ключ (глянь файл /config/keys)
            {
                expiresIn: 60 * 60 // Указыввем время жизни токена. В данном случае - час
            }
        );
        //status: 200 - ok
        //Говорим, что всё хорошо, данные коректно отработали
        res.status(200).json({ // Возвращаем в ответе объект с полем token, который юзер потом будет использовать для обращения к серверу
            token: `Bearer ${token}`
        })
    }
    else {
        //user not exists
        //status: 404 - думаю, сама знаешь, что он значит :)
        res.status(404).json({ // Если юзера нет, возвращаем ошибку
            message: 'This user not found!'
        })
    }

}

module.exports.register = async (req, res) => {

    // при регистрации ищем юзера с таким имейлом в бд
    // МЕТОДОВ ЗАПРОСА К БД ОЧЕНЬ МНОГО
    // ТАК ЧТО НЕ УДИВЛЯЙСЯ, ЧТО ОНИ МОГУТ СИНТАКСИЧЕСКИ ОТЛИЧАТЬСЯ,
    // ХОТЯ ДЕЛАЮТ ОДНО И ТО ЖЕ
    //Напрмиер findOne({ параметры поиска.. }) или findById( Id )
    // И то, и то вернёт один объект или не вернёт ничего
    // Что использовать выбирай сама :)
    const candidate = await User.findOne({email: req.body.email});

    if(candidate) {
        //user exists
        res.status(409).json({
            message: 'User with this email already exists!'
        })
    }
    else {
        //need create user
        // Создаём нового юзера
        // Все его поля можно посмотреть в /models/User
        const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
        });

        try {
            //Делаем запрос на сохранение нового юзера
            await user.save();
            //status: 201 - значит, что что-то создано
            res.status(201).json(user)
        }
        catch(e) {
            // импортируемая самописная функця
            // отдаёт ошибку сервера
            errorHandler(res, e);
        }

    }
}