import Layout from '../pages/adv/Layout.vue';
import AdvLogin from '../pages/adv/Login.vue';
import AdvSignup from '../pages/adv/signup/signupOne.vue';
import AdvSignupNext from '../pages/adv/signup/SignupTwo.vue';
import AdvSignupSuccess from '../pages/adv/signup/SignupThree.vue';

// /////////////////////////////////////////////////找回密码//////////////////////////////////////////////

import AdvFindpsw from '../pages/adv/findpsw/Account.vue';
import AdvFindpswEmail from '../pages/adv/findpsw/Email.vue';
import AdvFindpswReset from '../pages/adv/findpsw/Reset.vue';
import AdvFindpswSuccess from '../pages/adv/findpsw/Success.vue';

// /////////////////////////////////////////////////计划管理//////////////////////////////////////////////

import AdvIndex from '../pages/adv/index.vue';
import CampaignIndex from '../pages/adv/campaign/Index.vue';
import CampaignCreate from '../pages/adv/campaign/CreateStepCampaign.vue';
import CampaignCreateCreative from '../pages/adv/campaign/CreateStepCreative.vue';
import CampaignCreateTarget from '../pages/adv/campaign/CreateStepTarget.vue';
import CampaignCreateSucc from '../pages/adv/campaign/CreateStepSuc.vue';
import CampaignUpdate from '../pages/adv/campaign/Update.vue';
import AddCreative from '../pages/adv/campaign/AddCreative.vue';


// /////////////////////////////////////////////////数据管理//////////////////////////////////////////////

import DataIndex from '../pages/adv/data/Index.vue';

// /////////////////////////////////////////////////财务管理//////////////////////////////////////////////

import FinanceIndex from '../pages/adv/finance/Index.vue';
import FinanceData from '../pages/adv/finance/Data.vue';
import FinanceConfig from '../pages/adv/finance/Config.vue';

// /////////////////////////////////////////////////日志记录//////////////////////////////////////////////

import LogIndex from '../pages/adv/log/Index.vue';

// /////////////////////////////////////////////////通知记录//////////////////////////////////////////////

import MessageIndex from '../pages/adv/message/Index.vue';
import MessageDetail from '../pages/adv/message/Detail.vue';

// /////////////////////////////////////////////////通知记录//////////////////////////////////////////////

import UserIndex from '../pages/adv/user/Index.vue';
import UserPass from '../pages/adv/user/Password.vue';

// 开发者路由配置
export default
{
	'/adv/login':{
		component:AdvLogin,
		auth:false
	},
	'/adv/signup':{
		component:AdvSignup,
		auth:false
	},
	'/adv/signup/next':{
		component:AdvSignupNext,
		auth:false
	},
	'/adv/signup/success':{
		component:AdvSignupSuccess,
		auth:false
	},
    // 找回密码
    '/adv/findpsw':{
        component:AdvFindpsw,
        auth:false
    },
    '/adv/findpsw/email':{
        component:AdvFindpswEmail,
        auth:false
    },
    '/adv/findpsw/reset':{
        component:AdvFindpswReset,
        auth:false
    },
    '/adv/findpsw/success':{
        component:AdvFindpswSuccess,
        auth:false
    },
	'/adv': {
		component: Layout,
		subRoutes:{
			'/index':{
				component:AdvIndex
			},		
			'campaign/index':{
    			component:CampaignIndex
    		},
			'/campaign':{
				component:CampaignCreate
			},
			'/campaign/creative':{
				component:CampaignCreateCreative
			},
			'/campaign/target':{
				component:CampaignCreateTarget
			},
			'/campaign/succ':{
				component:CampaignCreateSucc
			},
			'/campaign/creative/add':{
				component:AddCreative
			},
    		// ///////////////////////////数据管理//////////////////////

    		'data/index':{
    			component:DataIndex
    		},

    		// ///////////////////////////财务管理//////////////////////

    		'/finance':{
    			component:FinanceIndex,
    			subRoutes:{
    				'/data':{
    					component:FinanceData,
    				},
    				'/config':{
    					component:FinanceConfig,
    				}
    			}
    		},

    		
    		// ///////////////////////////日志记录//////////////////////
    		'/log/index':{
				component:LogIndex
			},
			
			// ///////////////////////////消息记录//////////////////////
			
    		'/message/index':{
				component:MessageIndex
			},
			'/message/detail':{
				component:MessageDetail
			},
			
			// ///////////////////////////用户管理//////////////////////
    		'/user/index':{
				component:UserIndex
			},
			'/user/password':{
				component:UserPass
			}
		}
	}
};
