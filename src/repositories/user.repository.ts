import db from "../database/db";
import DatabaseError from "../models/errors/databaseError.model";
import User from "../models/user.model";

class UserRepository {
  async findAllUsers(): Promise<User[]> {
    const sqlQuery = `SELECT uuid, username FROM application_user`;

    const { rows } = await db.query<User>(sqlQuery);

    return rows || [];
  }

  async findUserById(uuid: string): Promise<User> {
    try {
      const sqlQuery = `
      SELECT uuid, username FROM application_user WHERE uuid = $1
    `;

      const values = [uuid];

      const { rows } = await db.query<User>(sqlQuery, values);
      const [user] = rows;

      return user || [];
    } catch (error) {
      throw new DatabaseError("Erro na consulta por ID", error);
    }
  }

  async createUser(user: User): Promise<string> {
    const sqlQuery = `
      INSERT INTO application_user (username, password) VALUES ($1, crypt($2, 'my_salt')) RETURNING uuid
    `;

    const values = [user.username, user.password];

    const { rows } = await db.query<{ uuid: string }>(sqlQuery, values);
    const [newUser] = rows;

    return newUser.uuid;
  }

  async updateUser(user: User): Promise<void> {
    const sqlQuery = `
      UPDATE application_user 
      SET username = $1, password = crypt($2, 'my_salt') 
      WHERE uuid = $3
    `;

    const values = [user.username, user.password, user.uuid];
    await db.query(sqlQuery, values);
  }

  async userDelete(uuid: string): Promise<void> {
    const sqlQuery = `
      DELETE FROM application_user WHERE uuid = $1
    `;

    const values = [uuid];
    await db.query(sqlQuery, values);
  }
}

export default new UserRepository();
