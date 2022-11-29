package com.trafigura.situ.security.repository;


import org.springframework.data.repository.Repository;

import com.trafigura.situ.security.entity.AppAccounts;

import java.util.Optional;

/**
 * @author atul.sultania
 *
 */
@org.springframework.stereotype.Repository(value = "securityAccountRepo")
public interface AccountRepo extends Repository<AppAccounts, Long> {
    Optional<AppAccounts> findByUsername(String username);
    AppAccounts save(AppAccounts account);
    int deleteAccountByuserId(Long userId);
}
