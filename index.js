

const express = require('express');
const morgan = require('morgan');
const { swaggerUi, specs } = require('../swagger'); // Importe a configuração do Swagger
const app = express();
const port = 3000;

// Middleware para parsing de parâmetros de consulta
app.use(express.json());

// Configuração personalizada do morgan para incluir o IP do cliente
morgan.format('custom', ':remote-addr :method :url :status :response-time ms');
app.use(morgan('custom')); // Usa o formato personalizado para o log

// Rota para a documentação Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Endpoint de cálculo
/**
 * @openapi
 * /calculate:
 *   get:
 *     summary: Realiza um cálculo simples
 *     parameters:
 *       - name: num1
 *         in: query
 *         description: Primeiro número
 *         required: true
 *         schema:
 *           type: number
 *       - name: num2
 *         in: query
 *         description: Segundo número
 *         required: true
 *         schema:
 *           type: number
 *       - name: operation
 *         in: query
 *         description: Operação matemática a ser realizada
 *         required: true
 *         schema:
 *           type: string
 *           enum: [+, -, x, /]  # Define os valores possíveis para operação
 *     responses:
 *       200:
 *         description: Resultado do cálculo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *       400:
 *         description: Erro na solicitação
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
app.get('/calculate', (req, res, next) => {
    try {
        const { num1, num2, operation } = req.query;

        // Decodifica o parâmetro 'operation' para tratar caracteres especiais
        const decodedOperation = decodeURIComponent(operation).replace(/\s+/g, '+');

        // Verifica o valor do parâmetro 'operation' recebido
        console.log(`Received operation: '${operation}'`);
        console.log(`Decoded operation: '${decodedOperation}'`);

        // Verifica se todos os parâmetros estão presentes
        if (num1 === undefined || num2 === undefined || decodedOperation === undefined) {
            throw new Error('Parâmetros insuficientes!');
        }

        // Converte os parâmetros para números
        const number1 = parseFloat(num1);
        const number2 = parseFloat(num2);


        // Verifica se os parâmetros são números válidos
        if (isNaN(number1) || isNaN(number2)) {
            throw new Error('Parâmetros inválidos!');
        }

        let result;

        // Realiza a operação baseada no parâmetro 'operation'
        switch (decodedOperation) {
            case '+':
                result = number1 + number2;
                break;
            case '-':
                result = number1 - number2;
                break;
            case 'x':
                result = number1 * number2;
                break;
            case '/':
                if (number2 === 0) {
                    throw new Error('Divisão por zero não é permitida!');
                }
                result = number1 / number2;
                break;
            default:
                throw new Error('Operação inválida!');
        }

        res.json({ result });
    } catch (error) {
        next(error); // Passa o erro para o middleware de tratamento
    }
});


app.get('/imc', (req, res, next) => {
    try {
        const { altura, peso} = req.query;

     
        // Verifica o valor do parâmetro 'operation' recebido
        console.log(`Received peso: '${peso}'`);
        console.log(`Receive altura: '${altura}'`);

        // Verifica se todos os parâmetros estão presentes
        if (peso === undefined || altura === undefined) {
            throw new Error('Parâmetros insuficientes!');
        }

        // Converte os parâmetros para números
        const pesoNumber = parseFloat(peso);
        const alturaNumber = parseFloat(altura/100);

        // Verifica se os parâmetros são números válidos
        if (isNaN(pesoNumber) || isNaN(alturaNumber)) {
            throw new Error('Parâmetros inválidos!');
        }

        let imc = pesoNumber / (alturaNumber * alturaNumber);
        let result;

/*
resultados menores que 16 — magreza grave;
resultados entre 16 e 16,9 — magreza moderada;
resultados entre 17 e 18,5 — magreza leve;
resultados entre 18,6 e 24,9 — peso ideal;
resultados entre 25 e 29,9 — sobrepeso;
resultados entre 30 e 34,9 — obesidade grau I;
resultados entre 35 e 39,9 — obesidade grau II ou severa;
resultados maiores do que 40 — obesidade grau III ou mórbida.

*/


        // Realiza a operação baseada no parâmetro 'operation'

        if (imc < 16) {
           result =  `${imc} - magreza grave`;
        } else if (imc >= 16 && imc < 16.9) {
            result =  `${imc} - magreza moderada`;
        }  else if ( imc >= 17 && imc < 18.5){
            result =  `${imc} - magreza leve`;
        } else if ( imc >= 18.6 && imc < 24.9){
            result =  `${imc} - peso ideal`;
        } else if ( imc >= 25 && imc < 29.9){
            result =  `${imc} - sobrepeso`;
        } else if ( imc >= 30 && imc < 34.9){
            result =  `${imc} - obesidade grau I`;
        } else if ( imc >= 35 && imc < 39.9){
            result =  `${imc} - obesidade grau II ou severa`;
        } else if ( imc < 40){
            result =  `${imc} - obesidade grau III ou mórbida`;
        }

        res.json({ result });
    } catch (error) {
        next(error); 
    }

});

app.get('/lados', (req, res, next) => {
    try {
        const { num1, num2, num3, num4} = req.query;

        
        

        // Verifica o valor do parâmetro 'operation' recebido
        console.log(`numero1: '${num1}'`);
        console.log(`numero2: '${num2}'`);
        console.log(`numero3: '${num3}'`);
        console.log(`numero4: '${num4}'`);
        
        // Verifica se todos os parâmetros estão presentes
        if (num1 === undefined || num2 === undefined || num3 === undefined || num4 === undefined) {
            throw new Error('Parâmetros insuficientes!');
        }

        // Converte os parâmetros para números
        const number1 = parseInt(num1);
        const number2 = parseInt(num2);
        const number3 = parseInt(num3);
        const number4 = parseInt(num4);


        // Verifica se os parâmetros são números válidos
        if (isNaN(number1) || isNaN(number2) || isNaN(number3) || isNaN(number4)) {
            throw new Error('Parâmetros inválidos!');
        }

        let result;
        let area;

        // Realiza a operação baseada no parâmetro 'operation'
        if (number1 == number2 && number2 == number3 && number3 == number4) {
            area = number1 * number2;
        } else  if((number1 == number2) && (number3 == number4)){
            area = number1 * number3;
        } else {
            throw new Error('Operação inválida!');
        }

        res.json({ result });
    } catch (error) {
        next(error); // Passa o erro para o middleware de tratamento
    }
});

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
    console.error(err.stack); // Log do erro
    res.status(400).json({ error: err.message }); // Responde com a mensagem de erro
});

app.listen(port, () => {
    console.log(`API rodando em http://localhost:${port}`);
});