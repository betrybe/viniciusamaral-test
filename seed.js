// colocar query do MongoDB
const data = { name: 'admin', email: 'root@email.com', password: 'admin', role: 'admin' };
db.users.insert([data])