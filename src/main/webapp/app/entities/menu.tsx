import React from 'react';
import { Translate } from 'react-jhipster';

import MenuItem from 'app/shared/layout/menus/menu-item';

const EntitiesMenu = () => {
  return (
    <>
      {/* prettier-ignore */}
      <MenuItem icon="asterisk" to="/person">
        <Translate contentKey="global.menu.entities.person" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/glasses">
        <Translate contentKey="global.menu.entities.glasses" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/owner">
        <Translate contentKey="global.menu.entities.owner" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/bike">
        <Translate contentKey="global.menu.entities.bike" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/driver">
        <Translate contentKey="global.menu.entities.driver" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/truck">
        <Translate contentKey="global.menu.entities.truck" />
      </MenuItem>
      {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
    </>
  );
};

export default EntitiesMenu as React.ComponentType<any>;
