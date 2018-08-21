import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getApplications } from 'reputable/dist/redux/selectors';

import { Header } from '../components';

const data = {
  records: [
    { rsid: '', chromosome: '1', position: '754105', genotype: 'CC' },
    { rsid: '', chromosome: '1', position: '872952', genotype: 'CC' },
    { rsid: '', chromosome: '1', position: '891277', genotype: 'CC' },
    { rsid: '', chromosome: '1', position: '897564', genotype: 'CC' },
    { rsid: '', chromosome: '1', position: '911101', genotype: 'CC' },
    { rsid: '', chromosome: '1', position: '914749', genotype: 'CC' },
    { rsid: '', chromosome: '1', position: '919419', genotype: 'CC' },
    { rsid: '', chromosome: '1', position: '978804', genotype: 'CC' },
    { rsid: '', chromosome: '1', position: '982968', genotype: 'CC' },
    { rsid: '', chromosome: '1', position: '983243', genotype: 'CC' }
  ],
  queryExecution: {
    QueryExecutionId: '5a12706d-4d05-4412-8c93-837d154b0e7c',
    Query: 'select * from demo.genome where genotype=\'CC\' limit 10',
    ResultConfiguration: {
      OutputLocation: 's3://my-dna-prototype-data/5a12706d-4d05-4412-8c93-837d154b0e7c.csv'
    },
    QueryExecutionContext: { Database: 'default' },
    Status: {
      State: 'SUCCEEDED',
      SubmissionDateTime: '2018-08-21T02:15:37.127Z',
      CompletionDateTime: '2018-08-21T02:15:39.526Z'
    },
    Statistics: {
      EngineExecutionTimeInMillis: 1982,
      DataScannedInBytes: 4132823
    }
  }
};

class Listings extends React.Component {
  render() {
    // const { applications } = this.props;

    return (
      <div>
        <style jsx>
          {`
            .record-container {
              max-width: 600px;
              margin: 0 auto;
            }

            .record-header,
            .record {
              display: flex;
              flex-direction: row;
              justify-content: space-between;
            }
          `}
        </style>

        <Header />
        <h1>Search Results</h1>

        <div className="record-container">
          <div className="record-header">
            <div>RSID</div>
            <div>Chromosome</div>
            <div>Position</div>
            <div>Genotype</div>
          </div>

          {
            data.records.map((record, idx) => (
              <div key={idx} className="record">
                <div>{record.rsid}</div>
                <div>{record.chromosome}</div>
                <div>{record.position}</div>
                <div>{record.genotype}</div>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

Listings.propTypes = {
  applications: PropTypes.arrayOf(PropTypes.object),
};

Listings.defaultProps = {
  applications: [],
};

const mapStateToProps = (state) => ({
  applications: getApplications(state),
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Listings);

