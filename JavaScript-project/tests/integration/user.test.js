import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';

import HttpStatus from 'http-status-codes';

import app from '../../src/index';

let Token;

let note_id;

describe('User APIs Test', () => {
  before((done) => {
    const clearCollections = () => {
      for (const collection in mongoose.connection.collections) {
        mongoose.connection.collections[collection].deleteOne(() => {});
      }
    };

    const mongooseConnect = async () => {
      await mongoose.connect(process.env.DATABASE_TEST);
      clearCollections();
    };

    if (mongoose.connection.readyState === 0) {
      mongooseConnect();
    } else {
      clearCollections();
    }

    done();
  });


/************************************* User Registration *********************************************/

  describe('POST / Users Registration', () => {
    it('Create User and Should return status 201', (done) => {
      const UserDetails = {
        FirstName: 'Roshni',
        LastName: 'Adatrao',
        EmailID: 'roshni10@gmail.com',
        Password: 'roshni10'
      };
      request(app)
        .post('/api/v1/users')
        .send(UserDetails)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.CREATED);

          done();
        });
    });
  
  it('User does not Created and Should return status 400', (done) => {
    const UserDetails = {
      FirstName: '12345',
      LastName: '67890',
      EmailID: '123456789',
      Password: '98765432'
    };
    request(app)
    .post('/api/v1/users')
    .send(UserDetails)
    .end((err, res) => {
      expect(res.statusCode).to.be.equal(HttpStatus.BAD_REQUEST);

      done();
    });
  });
});


/************************************* User Login *********************************************/

  describe('POST / Users Login', () => {
    it('When given EmailID and Password is correct return status 200', (done) => {
      const UserDetails = {
        EmailID: 'roshni10@gmail.com',
        Password: 'roshni10'
      };
      request(app)
      .post('/api/v1/users/login')
      .send(UserDetails)
      .end((err, res) => {
        Token = res.body.data;
        expect(res.statusCode).to.be.equal(HttpStatus.OK);
        done();
      });
    });

    it('EmailID does not Exists and Should return status 400', (done) => {
      const UserDetails = {
        EmailID: 'roshi@gmail.com',
        Password: 'ro467789'
      };
      request(app)
      .post('/api/v1/users/login')
      .send(UserDetails)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(HttpStatus.BAD_REQUEST);

        done();
      });
    });
  });

/************************************* Create Note *********************************************/

  describe('POST / Create Notes', () => {
    it('Create Note and Should return status 200', (done) => {
      const UserDetails = {
        Title: 'Express Project',
        Descreption: 'Node js',
        Color: 'Green'
      };
      request(app)
      .post('/api/v1/userNotes/')
      .set('Authorization', `Bearer ${Token}`)
      .send(UserDetails)
      .end((err, res) => {
        note_id = res.body.data._id;
        expect(res.statusCode).to.be.equal(HttpStatus.CREATED);

        done();
      });
    });

    it('Invalid Token and Should return status 400', (done) => {
      const UserDetails = {
        Title: 'Express Project',
        Descreption: 'Node js',
        Color: 'Green'
      };
      request(app)
      .post('/api/v1/userNotes/')
      .send(UserDetails)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(HttpStatus.UNAUTHORIZED);

        done();          
      });
    });
  });




/************************************* Get All Notes *********************************************/

  describe('GET / Get All Notes', () => {
    it('Getting All Notes and Should return status 200', (done) => {
      const UserDetails = {};
      request(app)
      .get('/api/v1/userNotes')
      .set('Authorization', `Bearer ${Token}`)
      .send(UserDetails)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(HttpStatus.OK);

        done();
      });
    });

    it('Invalid Token and Should return status 401', (done) => {
      const UserDetails = {};
      request(app)
      .get('/api/v1/userNotes/')
      .send(UserDetails)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(HttpStatus.UNAUTHORIZED);

        done();
      });
    });
  });


/************************************* Get Single Note *********************************************/
  
  describe('GET / Get Single Note', () => {
    it('Getting Single Note and Should return status 200', (done) => {
      const UserDetails = {};
      request(app)
      .get(`/api/v1/userNotes/${note_id}`)
      .set('Authorization', `Bearer ${Token}`)
      .send(UserDetails)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(HttpStatus.OK);

        done();
      });
    });
    
    it('Invalid Token and Should return status 401', (done) => {
      const UserDetails = {};
      request(app)
      .get(`/api/v1/userNotes/${note_id}`)
      .send(UserDetails)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(HttpStatus.UNAUTHORIZED);

        done();
      });
    });
  });


/************************************* Update Note *********************************************/

  describe('PUT / Update Note', () => {
    it('Update Note and Should return status 200', (done) => {
      const UserDetails = {
        Title: 'Express Api Cli Project',
        Descreption: 'Node js',
        Color: 'Green'
      };
      request(app)
      .put(`/api/v1/userNotes/${note_id}`)
      .set('Authorization', `Bearer ${Token}`)
      .send(UserDetails)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(HttpStatus.ACCEPTED);

        done();
      });
    });
    
    it('Invalid Token and Should return status 400', (done) => {
      const UserDetails = {
        Title: 'Express Api Cli Project',
        Descreption: 'Node js',
        Color: 'Green'
      };
      request(app)
      .put(`/api/v1/userNotes/${note_id}`)
      .send(UserDetails)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(HttpStatus.UNAUTHORIZED);

        done();
      });
    });
  });

/************************************* Delete Note *********************************************/

  describe('DELETE / Delete Note', () => {
    it('Delete Note and Should return status 200', (done) => {
      const UserDetails = {};
      request(app)
      .delete(`/api/v1/userNotes/${note_id}`)
      .set('Authorization', `Bearer ${Token}`)
      .send(UserDetails)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(HttpStatus.OK);

        done();
      });
    });
    
    it('Invalid Token and Should return status 400', (done) => {
      const UserDetails = {};
      request(app)
      .delete(`/api/v1/userNotes/${note_id}`)
      .send(UserDetails)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(HttpStatus.UNAUTHORIZED);

        done();
      });
    });
  });

/************************************* Archive Note *********************************************/

  describe('PUT / Archive Note', () => {
    it('Archive Note and Should return status 200', (done) => {
      const UserDetails = {};
      request(app)
      .put(`/api/v1/userNotes/${note_id}/isArchive`)
      .set('Authorization', `Bearer ${Token}`)
      .send(UserDetails)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(HttpStatus.ACCEPTED);

        done();
      });
    });
    
    it('Invalid Token and Should return status 400', (done) => {
      const UserDetails = {};
      request(app)
      .put(`/api/v1/userNotes/${note_id}`)
      .send(UserDetails)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(HttpStatus.UNAUTHORIZED);

        done();
      });
    });
  });

  /************************************* Trash Note *********************************************/

  describe('PUT / Trash Note', () => {
    it('Trash Note and Should return status 200', (done) => {
      const UserDetails = {};
      request(app)
      .put(`/api/v1/userNotes/${note_id}/isDelete`)
      .set('Authorization', `Bearer ${Token}`)
      .send(UserDetails)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(HttpStatus.OK);

        done();
      });
    });
    
    it('Invalid Token and Should return status 400', (done) => {
      const UserDetails = {};
      request(app)
      .put(`/api/v1/userNotes/${note_id}`)
      .send(UserDetails)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(HttpStatus.UNAUTHORIZED);

        done();
      });
    });
  });
});


