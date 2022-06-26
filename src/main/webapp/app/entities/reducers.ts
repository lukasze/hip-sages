import person from 'app/entities/person/person.reducer';
import glasses from 'app/entities/glasses/glasses.reducer';
import owner from 'app/entities/owner/owner.reducer';
import bike from 'app/entities/bike/bike.reducer';
import driver from 'app/entities/driver/driver.reducer';
import truck from 'app/entities/truck/truck.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

const entitiesReducers = {
  person,
  glasses,
  owner,
  bike,
  driver,
  truck,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
};

export default entitiesReducers;
