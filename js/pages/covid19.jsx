/*
modification history
--------------------
01a,06jun2021,deepankar created
*/

import React, { PureComponent } from 'react';
import Button from '../components/button';
import COVID19 from '../helpers/covid19';
import DateTime from '../helpers/datetime';
import isEmpty from '../helpers/isEmpty';

export default class Covid19 extends PureComponent {
  constructor(props){
    super(props);

    this.state = {
      vaccines: [],
      date:     DateTime.dayjs(new Date()).format('YYYY-MM-DD'),
      pin:      755001,
      finding:  false,
    };

    this.findVaccines = this.findVaccines.bind(this);
    this.renderVaccineSessions = this.renderVaccineSessions.bind(this);
    this.onSetPin = this.onSetPin.bind(this);
    this.onSetDate = this.onSetDate.bind(this);
  }

  onSetDate({ target: { value } }){
    this.setState({ date: value });
  }

  onSetPin({ target: { value } }){
    this.setState({ pin: value });
  }

  findVaccines(){
    const {
      pin, date, age, dose
    } = this.state;

    this.setState({ finding: true }, () => {
      COVID19.vaccineAvailability(pin, date, age, dose)
        .then((vaccines) => {
          this.setState({ vaccines });
        })
        .catch((error) => this.setState({ error }))
        .finally(() => this.setState({ finding: false }));
    });
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
      <table className="table is-striped is-hoverable is-fullwidth">
        <thead>
          <tr>
            <th>Date</th>
            <th>Place</th>
            <th>Total Dose</th>
            <th>Dose 1</th>
            <th>Dose 2</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {vaccines.map((v) => (
            <tr key={v.session_id}>
              <td>{/* DateTime.dayjs(v.date, 'DD-MM-YYYY').format('ddd, MMM DD') */ v.date}</td>
              <td>{v.center.name}</td>
              <td className="align-right">{v.available_capacity}</td>
              <td className="align-right">{v.available_capacity_dose1}</td>
              <td className="align-right">{v.available_capacity_dose2}</td>
              <td>
                {v.center.address}
                ,&nbsp;
                {v.center.block_name}
                ,&nbsp;
                {v.center.pincode}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  render(){
    const { date, pin, finding } = this.state;

    return (
      <main className="page page--covid19 dark dark-theme">
        <section className="hero is-dark is-bold is-fullheight-with-navbar root">
          <header className="hero-head">
            <div className="vaccine-finder">
              <div className="field">
                <div className="control">
                  <input placeholder="Pincode" className="input" type="number" value={pin} min={111111} max={999999} onChange={this.onSetPin} />
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <input className="input" type="date" value={date} onChange={this.onSetDate} min={DateTime.dayjs(new Date()).format('YYYY-MM-DD')} />
                </div>
              </div>
              <div className="control">
                <Button label="Find Vaccines" className="is-link" onClick={this.findVaccines} isBusy={finding} />
              </div>
            </div>
          </header>
          <main className="hero-body">
            {this.renderVaccineSessions()}
          </main>
        </section>
      </main>
    );
  }
}
