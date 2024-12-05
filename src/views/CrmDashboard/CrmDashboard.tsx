import Statistic from './components/Statistic';
import LeadByCountries from './components/LeadByCountries';
import Leads from './components/Leads';


const CrmDashboard = () => {

    return (
        <div className="flex flex-col gap-4 h-full">
            <Statistic />
            <div>
                <LeadByCountries
                    className="xl:col-span-5"
                />
            </div>
            <Leads />
        </div>
    );
};

export default CrmDashboard;
