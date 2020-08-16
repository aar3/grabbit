# Commands

## Rest
- Create new user

```bash
curl -X POST http://0.0.0.0:8000/api/v1/users/ \
-H 'Content-Type: application/json;charset=utf-8' \
-d '{"email":"g@gmail.com","name":"Gigi","secret":"password","type":"broker","phone":"+1-555-555-5555","username":"gigi"}' | json_pp
```