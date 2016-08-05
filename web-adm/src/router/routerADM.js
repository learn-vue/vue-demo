import Layout from '../pages/adm/Layout.vue';

import AdmLogin from '../pages/adm/Login.vue';

import AdmSignup from '../pages/adm/signup/SignupOne.vue';

import AdmSignupNext from '../pages/adm/signup/SignupTwo.vue';

import AdmSignupSuccess from '../pages/adm/signup/SignupThree.vue';

// /////////////////////////////////////////////////找回密码//////////////////////////////////////////////

import AdmFindpsw from '../pages/adm/findpsw/Account.vue';

import AdmFindpswEmail from '../pages/adm/findpsw/Email.vue';

import AdmFindpswReset from '../pages/adm/findpsw/Reset.vue';

import AdmFindpswSuccess from '../pages/adm/findpsw/Success.vue';

// /////////////////////////////////////////////////账号管理//////////////////////////////////////////////

import AccountIndex from '../pages/adm/account/Index.vue';

import AccountAdm from '../pages/adm/account/Adm.vue';

import AccountAdv from '../pages/adm/account/Adv.vue';

import AccountDev from '../pages/adm/account/Dev.vue';

// /////////////////////////////////////////////////开发者管理//////////////////////////////////////////////

import DeverIndex from '../pages/adm/dever/Index.vue';

import AppManagement from '../pages/adm/dever/App.vue';

import DeverData from '../pages/adm/dever/Data.vue';

import ConfigDivide from '../pages/adm/dever/Config/Divide.vue';

import ConfigAdvSource from '../pages/adm/dever/Config/Source.vue';

// /////////////////////////////////////////////////广告主管理//////////////////////////////////////////////

import AdverIndex from '../pages/adm/adver/Index.vue';

import AdvCampaign from '../pages/adm/adver/Campaign.vue';

import AdverData from '../pages/adm/adver/Data.vue';

import AdverConfig from '../pages/adm/adver/Config.vue';

// /////////////////////////////////////////////////财务管理//////////////////////////////////////////////

import FinanceIndex from '../pages/adm/finance/Index.vue';

import FinanceDev from '../pages/adm/finance/Dev.vue';

import FinanceAdv from '../pages/adm/finance/Adv.vue';

import AdvRecharge from '../pages/adm/finance/Recharge.vue';

import AdvRechargeList from '../pages/adm/finance/RechargeList.vue';

import DevWithdraw from '../pages/adm/finance/Withdraw.vue';

import DevWithdrawList from '../pages/adm/finance/WithdrawList.vue';

// 管理员路由配置
export default
{
    '/adm/login':{
        component:AdmLogin,
		auth:false
    },
    '/adm/signup':{
        component:AdmSignup,
		auth:false
    },
    '/adm/signup/next':{
        component:AdmSignupNext,
		auth:false
    },
    '/adm/signup/success':{
        component:AdmSignupSuccess,
		auth:false
    },
    // 找回密码
    '/adm/findpsw':{
        component:AdmFindpsw,
        auth:false
    },
    '/adm/findpsw/email':{
        component:AdmFindpswEmail,
        auth:false
    },
    '/adm/findpsw/reset':{
        component:AdmFindpswReset,
        auth:false
    },
    '/adm/findpsw/success':{
        component:AdmFindpswSuccess,
        auth:false
    },
	'/adm': {
		component: Layout,
		subRoutes:{
			'/account':{
				component:AccountIndex,
				subRoutes:{
					'/index':{
						component:AccountAdm,
					},
					'/dev':{
						component:AccountDev,
					},
					'/adv':{
						component:AccountAdv,
					}
				}
			},
			// ///////////////////////////开发者管理//////////////////////

    		'/dev':{
    			component:DeverIndex,
    			subRoutes:{
    				'/index':{
    					component:DeverIndex
    				},
    				'/app':{
    					component:AppManagement
    				},
    				'/data':{
    					component:DeverData
    				},
                    '/config/divide':{
                        component:ConfigDivide
                    },
                    '/config/adv/source':{
                        component:ConfigAdvSource
                    }
    			}
    		},
    		// ///////////////////////////广告主管理//////////////////////

    		'/adv':{
    			component:AdverIndex,
    			subRoutes:{
    				'/index':{
    					component:AdverIndex
    				},
    				'/campaign':{
    					component:AdvCampaign
    				},
    				'/data':{
    					component:AdverData
    				},
                    'config':{
                        component:AdverConfig
                    }

    			}
    		},
			// ///////////////////////////财务管理//////////////////////

    		'/finance':{
    			component:FinanceIndex,
    			subRoutes:{
    				'/index':{
    					component:FinanceIndex
    				},
    				'/dev':{
    					component:FinanceDev
    				},
    				'/adv':{
    					component:FinanceAdv
    				},
    				'/recharges':{
    					component:AdvRechargeList
    				},
    				'/recharge/create':{
    					component:AdvRecharge
    				},
    				'/withdraws':{
    					component:DevWithdrawList
    				},
    				'/withdraw/create':{
    					component:DevWithdraw
    				},
    			}
    		},
		}
	}
};
