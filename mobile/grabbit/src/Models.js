class BaseModel {
  constructor(data) {
    this.data = data;
  }
}

class User extends BaseModel {
  constructor(data) {
    super(data);
  }
}
