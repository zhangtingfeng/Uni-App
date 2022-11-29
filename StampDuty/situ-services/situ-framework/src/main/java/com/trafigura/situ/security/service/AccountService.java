package com.trafigura.situ.security.service;

import com.googlecode.jmapper.JMapper;
import com.googlecode.jmapper.api.enums.MappingType;
import com.trafigura.situ.security.entity.AppAccounts;
import com.trafigura.situ.security.entity.AppCompany;
import com.trafigura.situ.security.entity.AppCompanyImage;
import com.trafigura.situ.security.model.AppAccountsDTO;
import com.trafigura.situ.security.repository.AccountCompanyRepo;
import com.trafigura.situ.security.repository.AccountRepo;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * @author atul.sultania
 *
 */
@Service(value = "accountService")
@EnableJpaRepositories(basePackageClasses = {AccountRepo.class})
@EntityScan(basePackageClasses = {AppAccounts.class})
@Transactional(readOnly = true)
public class AccountService implements UserDetailsService {


	private final static Logger logger = LoggerFactory.getLogger(AccountService.class);

    @Autowired
    @Qualifier(value = "securityAccountRepo")
    private AccountRepo accountRepo;

    @Autowired(required = false)
    @Qualifier(value = "companyRepo")
    private AccountCompanyRepo accountCompanyRepo;

    private JMapper<AppAccountsDTO, AppAccounts> appAccountsMapper
            = new JMapper<>(AppAccountsDTO.class, AppAccounts.class);


    public AppAccounts loadAppAccountsByUsername(String userName) throws UsernameNotFoundException {
    	Optional<AppAccounts> account = accountRepo.findByUsername( userName.toLowerCase() );
        if ( account.isPresent() ) {
        	logger.info("Found account details for {}",userName);
        	AppAccounts retAppAccount = account.get();
            retAppAccount.enhanceGrantedAuthorities();
            return retAppAccount;
        } else {
        	logger.error("Invalid credentials");
            throw new UsernameNotFoundException(String.format("Username[%s] not found", userName));
        }
    }

    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
        Optional<AppAccounts> account = accountRepo.findByUsername( userName.toLowerCase() );
        if ( account.isPresent() ) {
            logger.info("Found account details for {}",userName);
            AppAccounts retAppAccount = account.get();
            retAppAccount.enhanceGrantedAuthorities();

            AppAccountsDTO returnUserDetails =
                    appAccountsMapper.getDestination(retAppAccount,
                            MappingType.ONLY_VALUED_FIELDS);

            return returnUserDetails;
        } else {
            logger.error("Invalid credentials");
            throw new UsernameNotFoundException(String.format("Username[%s] not found", userName));
        }
    }

    public AppAccounts findAccountByUsername(String username) throws UsernameNotFoundException {
        Optional<AppAccounts> account = accountRepo.findByUsername( username.toLowerCase() );
        if ( account.isPresent() ) {
            account.get().enhanceGrantedAuthorities();
            return account.get();
        } else {
            throw new UsernameNotFoundException(String.format("Username[%s] not found", username));
        }
    }

    public Optional<AppCompanyImage> getCompanyImage(Long appCompanyId) {

        Optional<AppCompanyImage> appCompanyImage = accountCompanyRepo.findAppCompanyImage(appCompanyId);

        return appCompanyImage;

    }


}
