import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IGlasses } from 'app/shared/model/glasses.model';
import { getEntities } from './glasses.reducer';

export const Glasses = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const glassesList = useAppSelector(state => state.glasses.entities);
  const loading = useAppSelector(state => state.glasses.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  const { match } = props;

  return (
    <div>
      <h2 id="glasses-heading" data-cy="GlassesHeading">
        <Translate contentKey="hipSagesApp.glasses.home.title">Glasses</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="hipSagesApp.glasses.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/glasses/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="hipSagesApp.glasses.home.createLabel">Create new Glasses</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {glassesList && glassesList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="hipSagesApp.glasses.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="hipSagesApp.glasses.model">Model</Translate>
                </th>
                <th>
                  <Translate contentKey="hipSagesApp.glasses.front">Front</Translate>
                </th>
                <th>
                  <Translate contentKey="hipSagesApp.glasses.temples">Temples</Translate>
                </th>
                <th>
                  <Translate contentKey="hipSagesApp.glasses.lenses">Lenses</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {glassesList.map((glasses, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/glasses/${glasses.id}`} color="link" size="sm">
                      {glasses.id}
                    </Button>
                  </td>
                  <td>{glasses.model}</td>
                  <td>{glasses.front}</td>
                  <td>{glasses.temples}</td>
                  <td>{glasses.lenses}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/glasses/${glasses.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/glasses/${glasses.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/glasses/${glasses.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
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
              <Translate contentKey="hipSagesApp.glasses.home.notFound">No Glasses found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Glasses;
