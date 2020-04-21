const LivroDao = require('../infra/livro-dao');
const db = require('../../config/database');

module.exports = (app) =>{
    app.get('/', function(req, resp){
        resp.send(
            `
            <html>
                <head>
                    <meta charset="UTF-8">
                </head>
            <title>Server rodando...</title>
            <body>
                <h1>Casa do Código</h1>
				<br>
				Esta página eh HTML puro
            </body>
            </html>
        `
        );
    });

    app.get('/livros', function(req, resp){

        const livroDao = new LivroDao(db);
        livroDao.lista()
                .then(livros => resp.marko(
                    require('../views/livros/lista/lista.marko'),
                        {
                            livros: livros
                        }   
                ))
                .catch(erro => console.log(erro));  
        });
        
        app.get('/livros/form/', function(req, resp){
            resp.marko(require('../views/livros/form/form.marko'), { livro: {} });
        });

        app.post('/livros', function(req, resp){
           console.log(req.body);
           const livroDao = new LivroDao(db);
           livroDao.adiciona(req.body)
                   .then(resp.redirect('/livros'))
                   .catch(erro => console.log(erro));  
        });

        app.put('/livros', function(req, resp){
           console.log(req.body);
           const livroDao = new LivroDao(db);
           livroDao.atualiza(req.body)
                   .then(resp.redirect('/livros'))
                   .catch(erro => console.log(erro));  
        });

        app.delete('/livros/:id', function(req, resp){
            const id = req.params.id;

            const livroDao = new LivroDao(db);
            livroDao.remove(id)
                    .then(() => resp.status(200).end())
                    .catch(erro => console.log(erro));
        });

        app.get('/livros/form/:id', function(req, resp) {
            const id = req.params.id;
            const livroDao = new LivroDao(db);
        
            livroDao.buscaPorId(id)
                .then(livro => 
                    resp.marko(
                        require('../views/livros/form/form.marko'),
                        { livro: livro }
                    )
                )
                .catch(erro => console.log(erro));
        
        });
    };












    // app.get('/livros', function(req, resp){

    //     const livroDao = new LivroDao(db);
    //     livroDao.lista(function(erro, resultados){
    //         resp.marko(
    //             require('../views/livros/lista/lista.marko'),
    //             {
    //                 livros: resultados
    //             }     
    //             );
    //         })
            
    //     });
        
    // app.get('/livros2', function(req, resp){
    //     db.all('SELECT * FROM livros', function(erro, resultados){
    //         resp.marko(
    //             require('../views/livros/lista/lista.marko'),
    //             {
    //                 livros: [
    //                     {
    //                         id: 1,
    //                         titulo: 'Fundamentos do Node'
    //                     },
    //                     {
    //                         id: 2,
    //                         titulo: 'teste giba'
    //                     }
    //                 ]
    //             }    
    //         );
    //     })
       
    // });

// const http = require('http');
// const servidor = http.createServer(function (req, resp) {
//     resp.end(`
//         <html>
//             <head>
//                 <meta charset="UTF-8">
//             </head>
//         <title>Server rodando...</title>
//         <body>
//             <h1>Casa do Código</h1>
//         </body>
//         </html>
//     `);
// });
// servidor.listen(3000);