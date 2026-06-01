import { useState } from 'react';
import { MEMBERSHIP_SCHEMES } from '../data';
import { ShieldCheck, Calendar, DollarSign, Calculator, HelpCircle, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface MembershipPlansProps {
  onBookClick: (preselectedServiceKeyword?: string) => void;
}

export default function MembershipPlans({ onBookClick }: MembershipPlansProps) {
  const [selectedPlanId, setSelectedPlanId] = useState('plan-luxury');
  const [familyMembersCount, setFamilyMembersCount] = useState(2);
  const [hasWhiteningIntention, setHasWhiteningIntention] = useState(true);

  // Traditional out-of-pocket pricing averages
  const AVG_CLEANING_COST = 200;
  const AVG_XRAY_COST = 140;
  const AVG_COSM_WHITENING = 450;

  const activePlan = MEMBERSHIP_SCHEMES.find((p) => p.id === selectedPlanId) || MEMBERSHIP_SCHEMES[1];

  // Logic calculation
  const calculateTraditionalCost = () => {
    const frequency = selectedPlanId === 'plan-luxury' ? 3 : 2;
    const basicPrevention = (AVG_CLEANING_COST * frequency + AVG_XRAY_COST) * familyMembersCount;
    const whiteningAddon = hasWhiteningIntention ? (AVG_COSM_WHITENING * familyMembersCount) : 0;
    return basicPrevention + whiteningAddon;
  };

  const calculateAeternaSubscriptionCost = () => {
    return activePlan.price * 12 * familyMembersCount;
  };

  const netSavings = calculateTraditionalCost() - calculateAeternaSubscriptionCost();

  return (
    <section id="plans" className="py-24 bg-white dark:bg-slate-900 transition-colors duration-300 overflow-hidden relative">
      <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-blue-200/5 dark:bg-blue-400/5 blur-3xl rounded-full" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-widest rounded-full border border-blue-100 dark:bg-blue-900/20 dark:border-blue-900/40 dark:text-blue-400">
            <DollarSign className="w-3.5 h-3.5" />
            <span className="tracking-widest font-semibold font-sans">
              Care Subscription Membership
            </span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl font-normal tracking-tight text-slate-900 dark:text-white leading-tight">
            Transparent Care Plans
          </h2>
          <p className="font-sans text-slate-500 dark:text-slate-400 text-base max-w-lg mx-auto font-light leading-relaxed">
            Ditch commercial deductibles, claims waiting periods, and hidden claims denials. Our in-house dental membership plans safeguard pristine oral health transparently.
          </p>
        </div>

        {/* Pricing Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-20 text-left">
          {MEMBERSHIP_SCHEMES.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-[2rem] p-8 flex flex-col justify-between border transition-all h-full ${
                plan.isPopular
                  ? 'bg-slate-950 text-white border-slate-900 dark:bg-slate-950 dark:border-blue-500/50 shadow-2xl scale-[1.02]'
                  : 'bg-slate-50 border-slate-200/40 text-slate-950 dark:bg-slate-950 dark:border-slate-800'
              }`}
            >
              {/* Star / Popular stamp */}
              {plan.isPopular && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white font-sans text-[8px] uppercase tracking-widest font-bold px-3.5 py-1.5 rounded-full shadow-md leading-none">
                  Aeterna Recommended Tier
                </span>
              )}

              <div>
                {/* Product Name */}
                <h3 className="font-sans text-base font-semibold uppercase tracking-wide leading-tight mt-1">
                  {plan.name}
                </h3>
                <p className={`font-sans text-xs mt-2 leading-relaxed ${plan.isPopular ? 'text-slate-300' : 'text-slate-500'}`}>
                  {plan.description}
                </p>

                {/* Pricing figures */}
                <div className="my-6">
                  <span className="font-sans text-4xl font-light tracking-tight flex items-baseline">
                    ${plan.price}
                    <span className={`font-mono text-[10px] uppercase font-bold tracking-wider ${plan.isPopular ? 'text-slate-400' : 'text-slate-500'} ml-1.5`}>
                      / member / month
                    </span>
                  </span>
                  <span className={`font-mono text-[9px] mt-1 block uppercase tracking-wider ${plan.isPopular ? 'text-blue-300' : 'text-blue-600'}`}>
                    Billed annually
                  </span>
                </div>

                {/* Plan Inclusions */}
                <div className="space-y-3 pt-6 border-t border-slate-200/40 dark:border-slate-800">
                  <p className="font-mono text-[9px] uppercase tracking-wider font-bold text-slate-400 dark:text-slate-500">
                    Prestige Inclusions
                  </p>
                  <ul className="space-y-3">
                    {plan.inclusions.map((inclusion, i) => (
                      <li key={i} className="flex items-start space-x-2.5">
                        <div className={`p-0.5 rounded-full flex-shrink-0 mt-0.5 ${plan.isPopular ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-50 text-blue-650 dark:bg-blue-900/20 dark:text-blue-400'}`}>
                          <ShieldCheck className="w-3.5 h-3.5" />
                        </div>
                        <span className={`font-sans text-xs leading-relaxed ${plan.isPopular ? 'text-slate-200' : 'text-slate-600 dark:text-slate-350 font-light'}`}>
                          {inclusion}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action trigger hooks */}
              <div className="mt-8 pt-6 border-t border-slate-200/40 dark:border-slate-800">
                <p className={`font-mono text-[10px] uppercase tracking-wider font-bold ${plan.isPopular ? 'text-emerald-400' : 'text-emerald-600'} leading-none mb-4`}>
                  {plan.savingsValue}
                </p>
                <button
                  onClick={() => onBookClick(plan.name)}
                  className={`w-full py-3.5 rounded-xl text-center font-sans text-xs font-bold uppercase tracking-widest transition shadow-md hover:scale-[1.02] flex items-center justify-center space-x-2 cursor-pointer ${
                    plan.isPopular
                      ? 'bg-white text-slate-950 hover:bg-slate-100'
                      : 'bg-[#0f172a] text-white hover:bg-blue-600 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100'
                  }`}
                >
                  <span>Select & Register</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Interactive Savings Calculator */}
        <div className="max-w-4xl mx-auto p-6 sm:p-8 rounded-[2rem] bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800/85 grid grid-cols-1 md:grid-cols-12 gap-8 items-center text-left">
          
          {/* Controls Calculator LHS */}
          <div className="md:col-span-7 space-y-6">
            <div className="flex items-center space-x-2">
              <Calculator className="w-5 h-5 text-blue-600" />
              <h3 className="font-serif text-2xl font-normal text-slate-900 dark:text-white">
                VIP Clinical Savings Calculator
              </h3>
            </div>

            {/* Plan selection */}
            <div className="space-y-2">
              <span className="font-sans text-[9px] uppercase tracking-wider text-slate-400 dark:text-slate-500 font-bold block">
                Calculate savings for
              </span>
              <div className="grid grid-cols-3 gap-2">
                {MEMBERSHIP_SCHEMES.map((plan) => (
                  <button
                    key={plan.id}
                    onClick={() => setSelectedPlanId(plan.id)}
                    className={`py-2 px-1 text-center font-sans text-[9px] font-bold uppercase rounded-lg border transition cursor-pointer ${
                      selectedPlanId === plan.id
                        ? 'bg-slate-900 border-slate-905 text-white dark:bg-white dark:text-slate-950'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {plan.name.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Family slider count */}
            <div className="space-y-2">
              <div className="flex justify-between items-baseline">
                <span className="font-mono text-[9px] uppercase tracking-wider text-slate-400 dark:text-slate-500 font-bold block">
                  Family Coverage Count
                </span>
                <span className="font-sans text-xs font-bold text-slate-900 dark:text-white">
                  {familyMembersCount} {familyMembersCount === 1 ? 'Patient' : 'Patients'}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                value={familyMembersCount}
                onChange={(e) => setFamilyMembersCount(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer accent-blue-600"
              />
            </div>

            {/* Whiten add-on */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800">
              <span className="font-sans text-xs text-slate-650 dark:text-slate-350">
                Plan to get professional bleaching / whitening?
              </span>
              <input
                type="checkbox"
                checked={hasWhiteningIntention}
                onChange={(e) => setHasWhiteningIntention(e.target.checked)}
                className="w-4.5 h-4.5 rounded border-slate-200 text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
            </div>
          </div>

          {/* savings summary RHS */}
          <div className="md:col-span-5 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 shadow-sm text-center flex flex-col justify-between space-y-4">
            <div className="space-y-1.5">
              <span className="font-mono text-[9px] uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-extrabold block leading-none">
                Est. Annual Care Savings
              </span>
              <div className="font-sans text-4xl font-extrabold text-emerald-500 tracking-tight py-2">
                ${Math.max(0, netSavings).toLocaleString()}
              </div>
              <p className="font-sans text-[10px] text-slate-400 dark:text-slate-500 leading-normal">
                Estimated savings vs. average private clinical single-session fees with out-of-pocket billing.
              </p>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-850">
              <div className="flex justify-between font-mono text-[9px] text-slate-400">
                <span>Traditional Fee Rate:</span>
                <span>${calculateTraditionalCost().toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-mono text-[9px] text-slate-400">
                <span>Aeterna Member Plan:</span>
                <span className="text-slate-600 dark:text-slate-300 font-bold">${calculateAeternaSubscriptionCost().toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={() => onBookClick(activePlan.name)}
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-sans text-[10px] font-bold uppercase tracking-wider shadow-sm transition cursor-pointer"
            >
              Secure Subscription
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
