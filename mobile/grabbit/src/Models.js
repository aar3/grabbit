class BaseModel {
  constructor(data) {
    this.data = data;
  }
}

export class User extends BaseModel {
  constructor(data) {
    super(data);
  }
}

export class Reward extends BaseModel {
  constructor(data) {
    super(data);
  }

  inactive() {
    return this.data.redeemed_at || this.expired();
  }

  expired() {
    return !this.data.redeemed_at && new Date(this.data.expiry) > new Date();
  }
}
