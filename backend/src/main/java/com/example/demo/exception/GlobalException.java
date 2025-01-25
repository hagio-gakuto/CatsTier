package com.example.demo.exception;

import java.util.Collections;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;

import jakarta.validation.ConstraintViolationException;

import org.apache.coyote.BadRequestException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.example.demo.dto.ErrorResDto;

@RestControllerAdvice
public class GlobalException extends ResponseEntityExceptionHandler {
	
	// エラーメッセージ設定
	@Autowired
	private MessageSource messageSource;
	
	// ログ設定
	private static final Logger logger = LoggerFactory.getLogger(GlobalException.class);
	
	// ResponseEntityExceptionHandlerデフォルトの例外レスポンスを統一
	@Override
	protected ResponseEntity<Object> handleExceptionInternal(Exception ex, Object body, HttpHeaders headers,
			HttpStatusCode status, WebRequest request) {
		
		ErrorResDto errorResponse = new ErrorResDto();
		errorResponse.setErrorCategory("Internal Server Error");
		errorResponse.setErrorMsg(Map.of("common", ex.getMessage()));
		
		return ResponseEntity.status(status).body(errorResponse);
	}
	
	// 入力バリデーションエラー（レスポンスコード：400）
	@Override
	public ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, HttpHeaders headers,
			HttpStatusCode status, WebRequest request) {
		
		ErrorResDto errorResponse = new ErrorResDto();
		// エラーカテゴリを設定
		errorResponse.setErrorCategory("VALIDATION_ERROR");
		
		BindingResult bindingResult = ex.getBindingResult();
		
		Map<String, String> errors = new HashMap<>();
		// フィールドエラー
		bindingResult.getFieldErrors().forEach((error) -> {
			String fieldName = ((FieldError) error).getField();
			String errorMessage = error.getDefaultMessage();
			errors.put(fieldName, errorMessage);
		});
		
		// 相関エラー
		AtomicInteger counter = new AtomicInteger(0);
		bindingResult.getGlobalErrors().forEach((error) -> {
			// mapのキーを一意にするために連番を付与
			String fieldName = "common_" + counter.getAndIncrement();
			String errorMessage = error.getDefaultMessage();
			errors.put(fieldName, errorMessage);
		});
		
		errorResponse.setErrorMsg(errors);
		
		// ログ出力
		logger.warn("400レスポンスエラー：", errors);
		
		return ResponseEntity.badRequest().body(errorResponse);
	}
	
	// 日付フォーマットエラー（レスポンスコード：400）
	@Override
	public ResponseEntity<Object> handleHttpMessageNotReadable(HttpMessageNotReadableException ex, HttpHeaders headers,
			HttpStatusCode status, WebRequest request) {
		return createErrorResponse("INVALID_DATE", "有効な日付を入力してください。", HttpStatus.UNAUTHORIZED);
	}
	
	// リクエストパラメータエラー（レスポンスコード：400）
	@ExceptionHandler(ConstraintViolationException.class)
	public ResponseEntity<Object> handleConstraintViolation(ConstraintViolationException ex, WebRequest request) {
		return createErrorResponse("TEST_VALIDATION", ex.getMessage(), HttpStatus.BAD_REQUEST);
	}
	
	// 不正リクエスト（レスポンスコード：400）
	@ExceptionHandler(BadRequestException.class)
	public ResponseEntity<Object> handleBadRequestException(BadRequestException ex, WebRequest request) {
		return createErrorResponse("BAD_REQUEST", ex.getMessage(), HttpStatus.BAD_REQUEST);
	}
	
	// パスワード一致しないエラー（レスポンスコード：400）
	@ExceptionHandler(GeneralException.class)
	public ResponseEntity<Object> handlePasswordConfirmException(GeneralException ex, WebRequest request) {
	    return createErrorResponse("PASSWORD_CONFIRM", ex.getMessage(), HttpStatus.BAD_REQUEST);
	}
	
	// 無効なフォーマット（レスポンスコード：400）
	@ExceptionHandler(IllegalArgumentException.class)
	public ResponseEntity<Object> handleIllegalArgument(BadRequestException ex, WebRequest request) {
		return createErrorResponse("INVALID_FORMAT", ex.getMessage(), HttpStatus.BAD_REQUEST);
	}
	
//	// 認証エラー（レスポンスコード：401）
//	@ExceptionHandler(UnauthorizedException.class)
//	public ResponseEntity<Object> handleUnauthorizedException(UnauthorizedException ex, WebRequest request) {
//		
//		System.out.println(ex.getMessage());
//		
//		return createErrorResponse("UNAUTHORIZED", ex.getMessage(), HttpStatus.UNAUTHORIZED);
//	}
	
//	// 権限エラー（レスポンスコード：403）
//	@ExceptionHandler(ForbiddenException.class)
//	public ResponseEntity<Object> handleForbiddenException(ForbiddenException ex, WebRequest request) {
//		return createErrorResponse("FORBIDDEN", ex.getMessage(), HttpStatus.FORBIDDEN);
//	}
//	
//	// （レスポンスコード：404）
//	@ExceptionHandler(ResourceNotFoundException.class)
//	public ResponseEntity<Object> handleResourceNotFoundException(ResourceNotFoundException ex, WebRequest request) {
//		return createErrorResponse("NOT_FOUND", ex.getMessage(), HttpStatus.NOT_FOUND);
//	}
//	
//	// リソース競合（レスポンスコード：409）
//	@ExceptionHandler(ConflictException.class)
//	public ResponseEntity<Object> handleConflictException(ConflictException ex, WebRequest request) {
//		return createErrorResponse("CONFLICT", ex.getMessage(), HttpStatus.CONFLICT);
//	}
//	
//	// DB操作失敗（レスポンスコード：500）
//	@ExceptionHandler(DatabaseOperationException.class)
//	public ResponseEntity<Object> handleDatabaseOperationException(DatabaseOperationException ex, WebRequest request) {
//		return createErrorResponse("DB_OPERATION_FAILED", ex.getMessage(), HttpStatus.CONFLICT);
//	}
	
	// 上記以外のすべての例外（レスポンスコード：500）
	@ExceptionHandler(Exception.class)
	public ResponseEntity<Object> handleAllException(Exception ex) {
		ErrorResDto errorResponse = new ErrorResDto();
		errorResponse.setErrorCategory("INTERNAL_SERVER_ERROR");
		String errorMessage = messageSource.getMessage("BE0007", null, Locale.JAPAN);
		errorResponse.setErrorMsg(Collections.singletonMap("common", errorMessage));
		
		// ログ出力
		logger.error("500レスポンスエラー", ex);
		
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
	}
	
	// レスポンスDTO（共通エラー）作成
	private ResponseEntity<Object> createErrorResponse(String errorCategory, String errorMessage, HttpStatus status) {
		
		ErrorResDto errorResponse = new ErrorResDto();
		errorResponse.setErrorCategory(errorCategory);
		
		Map<String, String> errorMsg = new HashMap<>();
		errorMsg.put("common", errorMessage);
		errorResponse.setErrorMsg(errorMsg);
		
		return ResponseEntity.status(status).body(errorResponse);
	}
	
}