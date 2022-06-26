import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IOwner } from 'app/shared/model/owner.model';
import { getEntities } from './owner.reducer';

export const Owner = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const ownerList = useAppSelector(state => state.owner.entities);
  const loading = useAppSelector(state => state.owner.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  const { match } = props;

  return (
    <div>
      <h2 id="owner-heading" data-cy="OwnerHeading">
        <Translate contentKey="hipSagesApp.owner.home.title">Owners</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="hipSagesApp.owner.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/owner/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="hipSagesApp.owner.home.createLabel">Create new Owner</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {ownerList && ownerList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="hipSagesApp.owner.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="hipSagesApp.owner.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="hipSagesApp.owner.lastName">Last Name</Translate>
                </th>
                <th>
                  <Translate contentKey="hipSagesApp.owner.mileage">Mileage</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {ownerList.map((owner, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/owner/${owner.id}`} color="link" size="sm">
                      {owner.id}
                    </Button>
                  </td>
                  <td>{owner.name}</td>
                  <td>{owner.lastName}</td>
                  <td>{owner.mileage}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/owner/${owner.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/owner/${owner.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/owner/${owner.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="hipSagesApp.owner.home.notFound">No Owners found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Owner;
