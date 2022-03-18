var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
var users;
//user login
router.post('/login_user', function(req, res, next){
    delete req.session.user;
    if ('account' in req.body && 'pass' in req.body){
    req.pool.getConnection(function(err,connection){
        if(err){
            res.sendStatus(500);
            return;
        }
        var query = "SELECT * FROM user WHERE phone_number=? AND password = SHA2(?,256);";
        connection.query(query, [req.body.account,req.body.pass], function(err, row, fields){
            connection.release();
            if(err){
                res.sendStatus(500);
                return;
            }
            if(row.length >0){
                req.session.user = row[0];
                res.json(row[0]);
                users = 'user';
            }
            else{
                res.sendStatus(401);
            }
        });
    });
    }
});

//venue manager login
router.post('/login_manager', function(req, res, next){
    delete req.session.user;
    if ('account' in req.body && 'pass' in req.body){
    req.pool.getConnection(function(err,connection){
        if(err){
            res.sendStatus(500);
            return;
        }
        var query = "SELECT * FROM venue_manager WHERE phone_number=? AND password = SHA2(?,256);";
        connection.query(query, [req.body.account,req.body.pass], function(err, row, fields){
            connection.release();
            if(err){
                res.sendStatus(500);
                return;
            }
            if(row.length >0){
                req.session.user = row[0];
                res.json(row[0]);
                users = 'manager';
            }
            else{
                res.sendStatus(401);
            }
        });
    });
    }
});

//admin login
router.post('/login_admin', function(req, res, next){
    delete req.session.user;
    if ('account' in req.body && 'pass' in req.body){
    req.pool.getConnection(function(err,connection){
        if(err){
            res.sendStatus(500);
            return;
        }
        var query = "SELECT * FROM admin WHERE phone_number=? AND password =SHA2(?,256);";
        connection.query(query, [req.body.account,req.body.pass], function(err, row, fields){
            connection.release();
            if(err){
                res.sendStatus(500);
                return;
            }
            if(row.length >0){
                req.session.user = row[0];
                res.json(row[0]);
                users = 'admin';
            }
            else{
                res.sendStatus(401);
            }
        });
    });
    }
});

//manager register
router.post('/register_manager', function(req, res, next){
    if ('firstname' in req.body && 'lastname' in req.body && 'phone' in req.body && 'email' in req.body && 'password' in req.body){
    req.pool.getConnection(function(err,connection){
        if(err){
            res.sendStatus(500);
            return;
        }
        var query = "INSERT INTO venue_manager (first_name, last_name, phone_number, email, password) VALUES (?,?,?,?,SHA2(?,256));";
        connection.query(query, [req.body.firstname, req.body.lastname, req.body.phone, req.body.email, req.body.password, req.body.phone], function(err, row, fields){
            connection.release();
            if(err){
                res.sendStatus(500);
                return;
            }
            res.sendStatus(200);
        });
    });
    }
    else{
        res.sendStatus(400);
    }
});

//user register
router.post('/register_user', function(req, res, next){
    if ('firstname' in req.body && 'lastname' in req.body && 'phone' in req.body && 'email' in req.body && 'password' in req.body){
    req.pool.getConnection(function(err,connection){
        if(err){
            res.sendStatus(500);
            return;
        }
        var query = "INSERT INTO user (first_name, last_name, phone_number, email, password) VALUES (?,?,?,?,SHA2(?,256));";
        connection.query(query, [req.body.firstname, req.body.lastname, req.body.phone, req.body.email, req.body.password], function(err, row, fields){
            connection.release();
            if(err){
                res.sendStatus(500);
                return;
            }
            res.sendStatus(200);
        });
    });
    }
    else{
        res.sendStatus(400);
    }
});

//check in
router.post('/checkin',function(req,res,next){
    if(req.session.user){
        if ('address' in req.body && 'time' in req.body){
            req.pool.getConnection(function(err,connection){
                if(err){
                    res.sendStatus(500);
                    return;
                }
                var query = "SELECT venue_id FROM venue WHERE address = ?;";
                connection.query(query, [req.body.address], function(err, row, fields){
                    connection.release();
                    if(err){
                        res.sendStatus(500);
                        return;
                    }
                    var address = row[0].venue_id;
                    var user_id = req.session.user.user_id;
                    req.pool.getConnection(function(err,connection){
                        if(err){
                            res.sendStatus(500);
                            return;
                        }
                        var querys = "INSERT INTO trip (arrvie_time, venue_id, user_id) VALUES (?,?,?);";
                        connection.query(querys, [req.body.time, address, user_id], function(err, rows, fields){
                            connection.release();
                            if(err){
                                // res.sendStatus(500);
                                return;
                            }
                            res.sendStatus(200);
                        });
                    });
                });
            });
        }
        else{
            res.sendStatus(400);
        }
    }
    else{
        res.sendStatus(401);
    }
});

//View user information
router.get('/infor', function(req,res,next){
    if(req.session.user){
        var user=req.session.user;
        res.json(user);
    }
    else{
        res.sendStatus(400);
    }
});

//The user changes the information and saves
router.post('/save', function(req,res,next){
    if(req.session.user){
        var tablename;
        var id;
        var num;
        if(users === 'user'){
            tablename = 'user';
            id = 'user_id';
            num = req.session.user.user_id;
        }
        else if(users === 'manager'){
            tablename = 'venue_manager';
            id = 'manager_id';
            num = req.session.user.manager_id;
        }
        else if(users === 'admin'){
            tablename = 'admin';
            id = 'admin_id';
            num = req.session.user.admin_id;
        }
        if ('firstname' in req.body && 'lastname' in req.body && 'phone' in req.body && 'email' in req.body && 'password' in req.body){
        req.pool.getConnection(function(err,connection){
            if(err){
                res.sendStatus(500);
                return;
            }
            var query = "UPDATE ?? SET first_name = ?, last_name=?, phone_number=?, email=?, password=SHA2(?,256) WHERE ??=?;";
            connection.query(query, [tablename, req.body.firstname, req.body.lastname, req.body.phone, req.body.email, req.body.password, id, num], function(err, row, fields){
                connection.release();
                if(err){
                    res.sendStatus(500);
                    return;
                }
                res.sendStatus(200);
            });
        });
        }
        else{
            res.sendStatus(400);
        }
    }
    else{
        res.sendStatus(400);
    }
});

//View History
router.get('/history', function(req,res,next){
    if(req.session.user){
        if(users === 'user'){
            var user_id = req.session.user.user_id;
            req.pool.getConnection(function(err,connection){
                if(err){
                    res.sendStatus(500);
                    return;
                }
                var query = "SELECT t.arrvie_time, u.first_name, u.last_name, v.address, v.hotspot FROM trip t LEFT JOIN user u ON u.user_id = t.user_id LEFT JOIN venue v ON v.venue_id = t.venue_id WHERE t.user_id = ?;";
                connection.query(query, [user_id], function(err,row,fields){
                    connection.release();
                    if(err){
                        res.sendStatus(500);
                        return;
                    }
                    res.json(row);
                });
            });
        }
        else if(users === 'manager'){
            var manager_id = req.session.user.manager_id;
            req.pool.getConnection(function(err,connection){
                if(err){
                    res.sendStatus(500);
                    return;
                }
                var query = 'SELECT t.arrvie_time, u.first_name, u.last_name, v.address, v.hotspot FROM trip t LEFT JOIN user u ON u.user_id = t.user_id LEFT JOIN venue v ON v.venue_id = t.venue_id WHERE v.manager_id = ?;';
                connection.query(query, [manager_id], function(err,row,fields){
                    connection.release();
                    if(err){
                        res.sendStatus(500);
                        return;
                    }
                    res.json(row);
                });
            });
        }
        else if(users === 'admin'){
            req.pool.getConnection(function(err,connection){
                if(err){
                    res.sendStatus(500);
                    return;
                }
                var query = 'SELECT t.arrvie_time, u.first_name, u.last_name, v.address, v.hotspot FROM trip t LEFT JOIN user u ON u.user_id = t.user_id LEFT JOIN venue v ON v.venue_id = t.venue_id ;';
                connection.query(query, function(err,row,fields){
                    connection.release();
                    if(err){
                        res.sendStatus(500);
                        return;
                    }
                    res.json(row);
                });
            });
        }
    }
    else{
        res.sendStatus(400);
    }
});
module.exports = router;
