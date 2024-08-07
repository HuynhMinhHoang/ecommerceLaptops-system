package com.java.hminhhoangdev.service.impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.java.hminhhoangdev.dto.request.AccountRequestDTO;
import com.java.hminhhoangdev.exception.ResourceNotFoundException;
import com.java.hminhhoangdev.model.Account;
import com.java.hminhhoangdev.model.Image;
import com.java.hminhhoangdev.model.Role;
import com.java.hminhhoangdev.repository.AccountRepository;
import com.java.hminhhoangdev.repository.RoleRepository;
import com.java.hminhhoangdev.service.AccountService;
import com.java.hminhhoangdev.util.AccountStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class AccountServiceImpl implements AccountService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    @Lazy
    private PasswordEncoder passwordEncoder;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private Cloudinary cloudinary;

    private static final String ALPHA_NUMERIC_STRING = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Account> userOptional = accountRepository.findByUsername(username);
        if (userOptional.isEmpty()) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }

        Account user = userOptional.get();

        UserDetails userDetails = User.builder().username(user.getUsername()).password(user.getPassword()).roles(user.getRole().getNameRole()).accountExpired(false).accountLocked(false).credentialsExpired(false).disabled(false).build();
        System.out.println("=>>>>User Info : " + userDetails.toString());

        return userDetails;
    }

    private String randomAlphaNumeric(int count) {
        StringBuilder builder = new StringBuilder();
        while (count-- != 0) {
            int character = (int) (Math.random() * ALPHA_NUMERIC_STRING.length());
            builder.append(ALPHA_NUMERIC_STRING.charAt(character));
        }
        return builder.toString();
    }

    @Override
    public Account registerUser(AccountRequestDTO accountRequestDTO) {
        Optional<Role> roleOptional = roleRepository.findById(2); // role id = 2
        if (roleOptional.isEmpty()) {
            throw new ResourceNotFoundException("Default role with id 2 not found");
        }

        if (accountRepository.existsByUsername(accountRequestDTO.getUsername())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Tài khoản đã được sử dụng!");
        }

        if (accountRepository.existsByEmail(accountRequestDTO.getEmail())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email đã được sử dụng!");
        }

        if (accountRepository.existsByPhone(accountRequestDTO.getPhone())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Số điện thoại đã được sử dụng!");
        }

        Account account = new Account();
        account.setUsername(accountRequestDTO.getUsername());
        account.setPassword(passwordEncoder.encode(accountRequestDTO.getPassword()));
        account.setFullName(randomAlphaNumeric(15));
        account.setEmail(accountRequestDTO.getEmail());
        account.setPhone(accountRequestDTO.getPhone());
        account.setStatus(AccountStatus.INACTIVE);
        Role role = roleOptional.get();
        account.setRole(role);

        if (accountRequestDTO.getAvt() != null && !accountRequestDTO.getAvt().isEmpty()) {
            try {
                Map<String, Object> uploadResult = cloudinary.uploader().upload(accountRequestDTO.getAvt().getBytes(), ObjectUtils.emptyMap());
                String avatarUrl = (String) uploadResult.get("url");
                account.setAvt(avatarUrl);
            } catch (IOException e) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to upload avatar", e);
            }
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Avatar is required");
        }

        return accountRepository.save(account);
    }

    @Override
    public List<Account> getListAccountAdmin() {
        return accountRepository.findAll();
    }

    @Override
    public Account updateAccountByAdmin(int id, AccountRequestDTO accountRequestDTO) {
        Account account = accountRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Account not found with id: " + id));
        Optional<Role> roleOptional = roleRepository.findById(accountRequestDTO.getRoleId());

//        if (accountRepository.existsByUsername(accountRequestDTO.getUsername())) {
//            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Username already in use!");
//        }
//        if (accountRepository.existsByEmail(accountRequestDTO.getEmail())) {
//            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email already in use!");
//        }
//        if (accountRepository.existsByPhone(accountRequestDTO.getPhone())) {
//            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Phone number already in use!");
//        }

        account.setFullName(accountRequestDTO.getFullName());
        account.setGender(accountRequestDTO.getGender());
        account.setDateOfBirth(accountRequestDTO.getDateOfBirth());
        account.setEmail(accountRequestDTO.getEmail());
        account.setUsername(accountRequestDTO.getUsername());
        if (accountRequestDTO.getPassword() != null && !accountRequestDTO.getPassword().isEmpty()) {
            account.setPassword(passwordEncoder.encode(accountRequestDTO.getPassword()));
        }
        account.setPhone(accountRequestDTO.getPhone());
        account.setAddress(accountRequestDTO.getAddress());
        account.setStatus(accountRequestDTO.getStatus());

        Role role = roleOptional.get();
        account.setRole(role);

        if (accountRequestDTO.getAvt() != null && !accountRequestDTO.getAvt().isEmpty()) {
            try {
                Map<String, Object> uploadResult = cloudinary.uploader().upload(accountRequestDTO.getAvt().getBytes(), ObjectUtils.emptyMap());
                String avatarUrl = (String) uploadResult.get("url");
                account.setAvt(avatarUrl);
            } catch (IOException e) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to upload avatar", e);
            }
        }

        return accountRepository.save(account);
    }

    @Override
    public Account createUserByAdmin(AccountRequestDTO accountRequestDTO) {
        if (accountRepository.existsByUsername(accountRequestDTO.getUsername())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Username already in use!");
        }
        if (accountRepository.existsByEmail(accountRequestDTO.getEmail())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email already in use!");
        }
        if (accountRepository.existsByPhone(accountRequestDTO.getPhone())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Phone number already in use!");
        }

        Optional<Role> roleOptional = roleRepository.findById(accountRequestDTO.getRoleId());
        Role role = roleOptional.get();


        Account account = new Account();
        account.setFullName(accountRequestDTO.getFullName());
        account.setGender(accountRequestDTO.getGender());
        account.setDateOfBirth(accountRequestDTO.getDateOfBirth());
        account.setEmail(accountRequestDTO.getEmail());
        account.setUsername(accountRequestDTO.getUsername());
        account.setPassword(passwordEncoder.encode(accountRequestDTO.getPassword()));
        account.setPhone(accountRequestDTO.getPhone());
        account.setAddress(accountRequestDTO.getAddress());
        account.setStatus(accountRequestDTO.getStatus());
        account.setRole(role);

        if (accountRequestDTO.getAvt() != null && !accountRequestDTO.getAvt().isEmpty()) {
            try {
                Map<String, Object> uploadResult = cloudinary.uploader().upload(accountRequestDTO.getAvt().getBytes(), ObjectUtils.emptyMap());
                String avatarUrl = (String) uploadResult.get("url");
                account.setAvt(avatarUrl);
            } catch (IOException e) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to upload avatar", e);
            }
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Avatar is required");
        }

        return accountRepository.save(account);
    }

}
