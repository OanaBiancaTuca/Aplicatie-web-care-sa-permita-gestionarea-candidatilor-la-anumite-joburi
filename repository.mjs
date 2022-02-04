import {config} from 'dotenv';
import Sequelize from 'sequelize';
config({});
let sequelize;
if(process.env.MODE==='development'){
	sequelize = new Sequelize({
		dialect: 'sqlite',
		storage: './jobs.db',//in ce fisier este stocata baza  ./ inseamna relativ la fisierul acesta
		define: {
			timestamps: false
		}
	});

}
else{
	sequelize=new Sequelize(process.env.DATABASE_URL,{
		dialect:'postgres',
		protocol:'postgres',
		dialectOptions:{
			ssl:{
				require:true,
				rejectUnauthorized:false
			}
		}
	})

}
const JobPosting=sequelize.define('jobposting',{
	id: {
		type: Sequelize.UUID,
		defaultValue: Sequelize.UUIDV4,
		allowNull: false,
		primaryKey: true
	},
    description: {
		type: Sequelize.STRING,
		allowNull: false,
        validate:{
            len: {
                args: 3,
                msg: "Description must be atleast 3 characters in length"
            }
        }
	},
    deadline:{
        type:Sequelize.DATEONLY,
        allowNull:false,
        validate:{
            isDate:true   
        }
    }

});
const Candidate = sequelize.define('candidate', {
	id: {
		type: Sequelize.UUID,
		defaultValue: Sequelize.UUIDV4,
		allowNull: false,
		primaryKey: true
	},
	name: {
		type: Sequelize.STRING,
		allowNull: false,
        validate:{
            len:{
            args: 5,
            msg: "Name must be atleast 5 characters in length"
            }
        }
	},
    cv: {
		type: Sequelize.STRING,
		allowNull: false,
        validate:{
            len:{
            args: 100,
            msg: "CV must be atleast 100 characters in length"
            }
        }
	},
    email:{
        type: Sequelize.STRING,
		allowNull: false,
        validate:{
            isEmail:true
        }
    }		
});
JobPosting.hasMany(Candidate, {foreignKey: 'jobpostingId'});
Candidate.belongsTo(JobPosting, {foreignKey: 'jobpostingId'});

async function initialize() {
	await sequelize.authenticate(); //apel de authenticate --> pt a se conecta la baza
	// await sequelize.sync({alter: true});//va astepta sa faca sync cu modelul

	await sequelize.sync();//actualizeaza modelele definite de noi cu definitia tabelelor in baza de date

	//functia sync este universala --> se intampla pentru orice store
	//actualizeza definitiile din baza de date conform cu definitiile din orm
	//creaza tabelel daca nu exista
	//force : true rescrie de fiecare data tabelele
	//alter: true---->face merge intre cum arata modelul meu acum si cum e in baza
}

//la final export 
export {
	initialize,
	JobPosting,Candidate
};