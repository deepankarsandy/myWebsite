/*
modification history
--------------------
01a,06jun2021,deepankar created
*/

import React, { Component } from 'react';
import Button from '../components/button';
import COVID19 from '../helpers/covid19';
import DateTime from '../helpers/datetime';
import isEmpty from '../helpers/isEmpty';

function filterVaccines(vaccines, filters){
  let filtered = vaccines;

  if (filters.has('18+') && filters.has('45+')){
    filtered = filtered.filter((v) => (v.min_age_limit === 18 || v.min_age_limit === 45));
  } else if (filters.has('45+')){
    filtered = filtered.filter((v) => v.min_age_limit === 45);
  } else if (filters.has('18+')){
    filtered = filtered.filter((v) => v.min_age_limit === 18);
  }

  if (filters.has('dose1') && filters.has('dose2')){
    filtered = filtered.filter((v) => (
      (v.available_capacity_dose1 > 0) || (v.available_capacity_dose2 > 0)
    ));
  } else if (filters.has('dose1')){
    filtered = filtered.filter((v) => v.available_capacity_dose1 > 0);
  } else if (filters.has('dose2')){
    filtered = filtered.filter((v) => v.available_capacity_dose2 > 0);
  }

  if (filters.has('free')){
    filtered = filtered.filter((v) => v.center.fee_type === 'Free');
  }

  return filtered;
}
export default class Covid19 extends Component {
  constructor(props){
    super(props);

    this.state = {
      vaccines: [],
      date:     DateTime.dayjs(new Date()).format('YYYY-MM-DD'),
      pin:      755001,
      finding:  false,
      filters:  new Map(),
      origData: [],
    };

    this.findVaccines = this.findVaccines.bind(this);
    this.renderVaccineSessions = this.renderVaccineSessions.bind(this);
    this.onSetPin = this.onSetPin.bind(this);
    this.onSetDate = this.onSetDate.bind(this);
    this.toggleFilters = this.toggleFilters.bind(this);
  }

  componentDidMount(){
    this.findVaccines();
  }

  onSetDate({ target: { value } }){
    this.setState({ date: value });
  }

  onSetPin({ target: { value } }){
    this.setState({ pin: value });
  }

  findVaccines(){
    const {
      pin, date, age, dose, filters
    } = this.state;

    this.setState({ finding: true }, () => {
      COVID19.vaccineAvailability(pin, date, age, dose)
        .then((vaccines) => {
          this.setState({
            vaccines: filterVaccines(vaccines, filters), origData: vaccines
          });
        })
        .catch((error) => this.setState({ error }))
        .finally(() => this.setState({ finding: false }));
    });
  }

  toggleFilters({ currentTarget: { dataset: { filter } } }){
    const { filters, origData } = this.state;

    if (filters.has(filter)){
      filters.delete(filter);
    } else {
      filters.set(filter);
    }

    this.setState({ filters, vaccines: filterVaccines(origData, filters) });
  }

  renderVaccineSessions(){
    const { vaccines } = this.state;

    if (isEmpty(vaccines)){
      return (
        <span className="has-text-warning">
          No vaccines available.
        </span>
      );
    }

    return (
      <div className="table-container">
        <table className="table is-striped is-hoverable is-fullwidth">
          <thead>
            <tr>
              <th className="no-wrap">Date</th>
              <th colSpan={2}>Place</th>
              <th className="no-wrap">Dose</th>
              <th colSpan={3} className="is-hidden-mobile">Address</th>
              <th>Register</th>
            </tr>
          </thead>
          <tbody>
            {vaccines.map((v) => (
              <tr key={v.session_id}>
                <td className="no-wrap">{/* DateTime.dayjs(v.date, 'DD-MM-YYYY').format('ddd, MMM DD') */ v.date}</td>
                <td colSpan={2}>{v.center.name}</td>
                <td className="align-right">{v.available_capacity}</td>
                <td colSpan={3} className="is-hidden-mobile">
                  {v.center.address}
                  ,&nbsp;
                  {v.center.block_name}
                </td>
                <td>
                  <a className="button is-link is-size-7-mobile" href="https://selfregistration.cowin.gov.in/" target="cowin_register" title="register">
                    Register
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  render(){
    const {
      date, pin, finding, filters
    } = this.state;

    return (
      <main className="page page--covid19 dark dark-theme is-size-7-mobile">
        <section className="hero is-dark is-bold is-fullheight-with-navbar root">
          <header className="hero-head">
            <div className="vaccine-finder">
              <div className="pincode field">
                <div className="control">
                  <input placeholder="Pincode" className="input" type="number" value={pin} onChange={this.onSetPin} />
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <input className="input" type="date" value={date} onChange={this.onSetDate} min={DateTime.dayjs(new Date()).format('YYYY-MM-DD')} />
                </div>
              </div>
              <div className="control">
                <Button label="Find Vaccines" icon="fas fa-search" className="is-link is-size-7-mobile" onClick={this.findVaccines} isBusy={finding} />
              </div>
              <div className="control">
                <Button label="Refresh" icon="fas fa-sync-alt" className="is-link is-size-7-mobile" onClick={this.findVaccines} isBusy={finding} />
              </div>
            </div>
          </header>
          <main className="hero-body">
            <section className="filters buttons">
              <Button
                label="18+"
                data-filter="18+"
                onClick={this.toggleFilters}
                className={`is-size-7-mobile ${filters.has('18+') ? 'is-link' : 'is-dark'}`}
                iconAlignRight
                icon={filters.has('18+') ? 'fas fa-check' : ''}
              />
              <Button
                label="45+"
                data-filter="45+"
                onClick={this.toggleFilters}
                className={`is-size-7-mobile ${filters.has('45+') ? 'is-link' : 'is-dark'}`}
                iconAlignRight
                icon={filters.has('45+') ? 'fas fa-check' : ''}
              />
              <Button
                label="Dose 1"
                data-filter="dose1"
                onClick={this.toggleFilters}
                className={`is-size-7-mobile ${filters.has('dose1') ? 'is-link' : 'is-dark'}`}
                iconAlignRight
                icon={filters.has('dose1') ? 'fas fa-check' : ''}
              />
              <Button
                label="Dose 2"
                data-filter="dose2"
                onClick={this.toggleFilters}
                className={`is-size-7-mobile ${filters.has('dose2') ? 'is-link' : 'is-dark'}`}
                iconAlignRight
                icon={filters.has('dose2') ? 'fas fa-check' : ''}
              />
              <Button
                label="Free"
                data-filter="free"
                onClick={this.toggleFilters}
                className={`is-size-7-mobile ${filters.has('free') ? 'is-link' : 'is-dark'}`}
                iconAlignRight
                icon={filters.has('free') ? 'fas fa-check' : ''}
              />
            </section>
            {this.renderVaccineSessions()}
          </main>
        </section>
      </main>
    );
  }
}
